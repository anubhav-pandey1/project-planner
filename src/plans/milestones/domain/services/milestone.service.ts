import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  MilestoneModel,
  MilestoneDocument,
} from 'src/plans/milestones/data/schemas/milestone.schema';
import { Milestone } from 'src/plans/milestones/domain/entities/milestone.entity';
import { MilestoneMapper } from 'src/plans/milestones/mappers/milestone.mapper';
import { PhaseService } from 'src/plans/phases/domain/services/phase.service';
import { ProducerService } from 'src/common/kafka/services/producer.service';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(MilestoneModel.name)
    private readonly milestoneModel: Model<MilestoneDocument>,

    @Inject(PhaseService)
    private readonly phaseService: PhaseService,

    @Inject(ProducerService)
    private readonly producerService: ProducerService,
  ) {}

  async create(createMilestoneInput: Partial<Milestone>) {
    if (!createMilestoneInput.phaseId) {
      throw new Error('Milestone phaseId is required');
    }
    const relatedPhase = await this.phaseService.findOne(
      createMilestoneInput.phaseId.id,
    );
    const createdMilestone = await this.milestoneModel.create({
      ...createMilestoneInput,
      phaseId: relatedPhase,
    });
    await this.producerService.produce('milestone', {
      value: JSON.stringify({
        type: 'MILESTONE_TAGGED_TO_PHASE',
        payload: {
          milestoneId: createdMilestone._id,
          oldPhaseId: null,
          newPhaseId: relatedPhase?.id,
        },
      }),
    });
    return MilestoneMapper.persistenceToDomainEntity(createdMilestone);
  }

  async findAll() {
    const models = await this.milestoneModel.find().exec();
    return models.map((model) =>
      MilestoneMapper.persistenceToDomainEntity(model),
    );
  }

  async findOne(id: string) {
    const model = await this.milestoneModel.findById(id).exec();
    return model ? MilestoneMapper.persistenceToDomainEntity(model) : null;
  }

  async updateOne(id: string, updateMilestoneInput: Partial<Milestone>) {
    const relatedPhase = updateMilestoneInput.phaseId
      ? await this.phaseService.findOne(updateMilestoneInput.phaseId.id)
      : undefined;

    if (updateMilestoneInput.phaseId && !relatedPhase) {
      throw new Error('Milestone phaseId is invalid');
    }

    const previousModel = await this.milestoneModel
      .findByIdAndUpdate(
        id,
        {
          ...updateMilestoneInput,
          phaseId: relatedPhase,
        },
        { new: false },
      )
      .exec();

    if (relatedPhase) {
      await this.producerService.produce('milestone', {
        value: JSON.stringify({
          type: 'MILESTONE_TAGGED_TO_PHASE',
          payload: {
            milestoneId: id,
            milestoneTitle: previousModel?.title,
            oldPhaseId: previousModel?.phaseId.id,
            newPhaseId: relatedPhase.id,
          },
        }),
      });
    }

    return previousModel
      ? MilestoneMapper.persistenceToDomainEntity(previousModel)
      : null;
  }

  async delete(id: string) {
    const deletedModel = await this.milestoneModel.findByIdAndRemove(id).exec();
    await this.producerService.produce('milestone', {
      value: JSON.stringify({
        type: 'MILESTONE_DELETED',
        payload: {
          milestoneId: id,
          milestoneTitle: deletedModel?.title,
          phaseId: deletedModel?.phaseId.id,
        },
      }),
    });
    return deletedModel
      ? MilestoneMapper.persistenceToDomainEntity(deletedModel)
      : null;
  }

  async handlePhaseDeleted(phaseId: string) {
    // All milestones must have a phase
    // So a phase getting deleted should delete all milestones
    return this.milestoneModel.deleteMany({ 'phase.id': phaseId }).exec();
  }
}

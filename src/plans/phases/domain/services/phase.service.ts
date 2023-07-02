import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  PhaseModel,
  PhaseDocument,
} from 'src/plans/phases/data/schemas/phase.schema';
import { Phase } from 'src/plans/phases/domain/entities/phase.entity';
import { PhaseMapper } from 'src/plans/phases/mappers/phase.mapper';
import { ProducerService } from 'src/common/kafka/services/producer.service';

@Injectable()
export class PhaseService {
  constructor(
    @InjectModel(PhaseModel.name)
    private readonly phaseModel: Model<PhaseDocument>,

    @Inject(ProducerService)
    private readonly producerService: ProducerService,
  ) {}

  async create(createPhaseInput: Partial<Phase>) {
    const createdPhase = await this.phaseModel.create(createPhaseInput);
    return PhaseMapper.persistenceToDomainEntity(createdPhase);
  }

  async findAll() {
    const models = await this.phaseModel.find().exec();
    return models.map((model) => PhaseMapper.persistenceToDomainEntity(model));
  }

  async findOne(id: string) {
    const model = await this.phaseModel.findById(id).exec();
    return model ? PhaseMapper.persistenceToDomainEntity(model) : null;
  }

  async updateOne(id: string, updatePhaseInput: Partial<Phase>) {
    const updatedModel = await this.phaseModel
      .findByIdAndUpdate(id, updatePhaseInput, { new: true })
      .exec();
    return updatedModel
      ? PhaseMapper.persistenceToDomainEntity(updatedModel)
      : null;
  }

  async delete(id: string) {
    const deletedModel = await this.phaseModel.findByIdAndRemove(id).exec();
    await this.producerService.produce('phase', {
      value: JSON.stringify({
        type: 'PHASE_DELETED',
        payload: { phaseId: deletedModel?._id },
      }),
    });
    return deletedModel
      ? PhaseMapper.persistenceToDomainEntity(deletedModel)
      : null;
  }

  async handleMilestoneTaggedToPhase(
    milestoneId: string,
    milestoneString: string,
    oldPhaseId: string,
    newPhaseId: string,
  ) {
    await this.phaseModel
      .findByIdAndUpdate(oldPhaseId, {
        $pull: { milestoneIds: { id: milestoneId } },
      })
      .exec();

    // Need to use $addToSet instead of $push for an idempotent operation
    // NOTE: Unsure if $addToSet only uses the id or the title as well?
    await this.phaseModel
      .findByIdAndUpdate(newPhaseId, {
        $addToSet: {
          milestoneIds: { id: milestoneId, title: milestoneString },
        },
      })
      .exec();
  }

  async handleMilestoneDeleted(milestoneId: string, phaseId: string) {
    await this.phaseModel
      .findByIdAndUpdate(phaseId, {
        $pull: { milestoneIds: { id: milestoneId } },
      })
      .exec();
  }
}

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

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(MilestoneModel.name)
    private readonly milestoneModel: Model<MilestoneDocument>,

    @Inject(PhaseService)
    private readonly phaseService: PhaseService,
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
      phase: relatedPhase,
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

    const updatedModel = await this.milestoneModel
      .findByIdAndUpdate(
        id,
        { ...updateMilestoneInput, phase: relatedPhase },
        { new: true },
      )
      .exec();
    return updatedModel
      ? MilestoneMapper.persistenceToDomainEntity(updatedModel)
      : null;
  }

  async delete(id: string) {
    const deletedModel = await this.milestoneModel.findByIdAndRemove(id).exec();
    return deletedModel
      ? MilestoneMapper.persistenceToDomainEntity(deletedModel)
      : null;
  }
}

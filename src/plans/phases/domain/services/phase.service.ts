import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  PhaseModel,
  PhaseDocument,
} from 'src/plans/phases/data/schemas/phase.schema';
import { Phase } from 'src/plans/phases/domain/entities/phase.entity';
import { PhaseMapper } from 'src/plans/phases/mappers/phase.mapper';

@Injectable()
export class PhaseService {
  constructor(
    @InjectModel(PhaseModel.name)
    private readonly phaseModel: Model<PhaseDocument>,
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
    return deletedModel
      ? PhaseMapper.persistenceToDomainEntity(deletedModel)
      : null;
  }

  async handleMilestoneTaggedToPhase(
    milestoneId: string,
    oldPhaseId: string,
    newPhaseId: string,
  ) {
    await this.phaseModel
      .findByIdAndUpdate(oldPhaseId, {
        $pull: { milestones: milestoneId },
      })
      .exec();

    // Need to use $addToSet instead of $push for an idempotent operation
    await this.phaseModel
      .findByIdAndUpdate(newPhaseId, {
        $addToSet: { milestones: milestoneId },
      })
      .exec();
  }
}

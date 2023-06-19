import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  MilestoneModel,
  MilestoneDocument,
} from 'src/project-management/data/schemas/milestone.schema';
import { Milestone } from 'src/project-management/domain/entities/milestone.entity';
import { MilestoneMapper } from 'src/project-management/mappers/milestone.mapper';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(MilestoneModel.name)
    private readonly milestoneModel: Model<MilestoneDocument>,
  ) {}

  async create(createMilestoneInput: Partial<Milestone>) {
    const createdMilestone = await this.milestoneModel.create(
      createMilestoneInput,
    );
    console.log(createdMilestone);
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
    const updatedModel = await this.milestoneModel
      .findByIdAndUpdate(id, updateMilestoneInput, { new: true })
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MilestoneModel, MilestoneDocument } from '../schemas/milestone.schema';
import { MilestoneMapper } from 'src/project-management/mappers/milestone.mapper';
import { Milestone } from 'src/project-management/domain/entities/milestone.entity';

@Injectable()
export class MilestoneRepository {
  constructor(
    @InjectModel(MilestoneModel.name)
    private readonly milestoneModel: Model<MilestoneDocument>,
  ) {}

  async create(data: Partial<MilestoneModel>) {
    const createdModel = await this.milestoneModel.create(data);
    console.log(createdModel);
    return MilestoneMapper.persistenceToDomainEntity(createdModel);
  }

  async findAll() {
    const models = await this.milestoneModel.find().exec();
    return models.map((model) =>
      MilestoneMapper.persistenceToDomainEntity(model),
    );
  }

  async findById(id: string) {
    const model = await this.milestoneModel.findById(id).exec();
    return model ? MilestoneMapper.persistenceToDomainEntity(model) : null;
  }

  async update(id: string, data: Partial<Milestone>) {
    const updatedModel = await this.milestoneModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedModel
      ? MilestoneMapper.persistenceToDomainEntity(updatedModel)
      : null;
  }

  async delete(id: string): Promise<Milestone | null> {
    const deletedModel = await this.milestoneModel.findByIdAndRemove(id).exec();
    return deletedModel
      ? MilestoneMapper.persistenceToDomainEntity(deletedModel)
      : null;
  }
}

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMilestoneDto, UpdateMilestoneDto } from '../dto/milestone.dto';
import { Milestone } from '../schemas/milestone.schema';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name)
    private readonly milestoneModel: Model<Milestone>,
  ) {}

  async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const createdMilestone = this.milestoneModel.create(createMilestoneDto);
    return createdMilestone;
  }

  async findAll(): Promise<Milestone[]> {
    return this.milestoneModel.find().exec();
  }

  async findOne(id: string): Promise<Milestone | null> {
    return this.milestoneModel.findOne({ _id: id }).exec();
  }

  async updateOne(
    id: string,
    updateMilestoneDto: UpdateMilestoneDto,
  ): Promise<Milestone | null> {
    return this.milestoneModel
      .findOneAndUpdate({ _id: id }, updateMilestoneDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    const deletedMilestone = await this.milestoneModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMilestone;
  }
}

import { Injectable } from '@nestjs/common';
import { Milestone } from '../entities/milestone.entity';
import { MilestoneRepository } from '../../data/repositories/milestone.repository';

@Injectable()
export class MilestoneService {
  constructor(private readonly milestoneRepository: MilestoneRepository) {}

  async create(createMilestoneInput: Partial<Milestone>) {
    const createdMilestone =
      this.milestoneRepository.create(createMilestoneInput);
    return createdMilestone;
  }

  async findAll() {
    return this.milestoneRepository.findAll();
  }

  async findOne(id: string) {
    return this.milestoneRepository.findById(id);
  }

  async updateOne(id: string, updateMilestoneInput: Partial<Milestone>) {
    return this.milestoneRepository.update(id, updateMilestoneInput);
  }

  async delete(id: string) {
    return this.milestoneRepository.delete(id);
  }
}

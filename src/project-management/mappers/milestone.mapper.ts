import { MilestoneDocument } from '../data/schemas/milestone.schema';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from '../api/rest/dto/milestone.dto';
import { Milestone } from '../domain/entities/milestone.entity';

export class MilestoneMapper {
  static createMilestoneDtoToDomainInput(
    createMilestoneDto: CreateMilestoneDto,
  ) {
    const milestone: Partial<Milestone> = {
      title: createMilestoneDto.title,
      description: createMilestoneDto.description,
    };
    return milestone;
  }

  static updateMilestoneDtoToDomainInput(
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    const milestone: Partial<Milestone> = {
      title: updateMilestoneDto.title,
      description: updateMilestoneDto.description,
    };
    return milestone;
  }

  static persistenceToDomainEntity(milestone: MilestoneDocument) {
    return new Milestone(
      milestone._id.toHexString(),
      milestone.title,
      milestone.description,
    );
  }
}

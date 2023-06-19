import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from 'src/milestones/api/rest/dto/milestone.dto';
import { Milestone } from 'src/milestones/domain/entities/milestone.entity';
import { MilestoneDocument } from 'src/milestones/data/schemas/milestone.schema';
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
      milestone.createdAt,
      milestone.updatedAt,
    );
  }
}

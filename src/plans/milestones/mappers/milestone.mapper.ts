import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from 'src/plans/milestones/api/rest/dto/milestone.dto';
import {
  PhaseId,
  Milestone,
} from 'src/plans/milestones/domain/entities/milestone.entity';
import { MilestoneDocument } from 'src/plans/milestones/data/schemas/milestone.schema';

export class MilestoneMapper {
  static createMilestoneDtoToDomainInput(
    createMilestoneDto: CreateMilestoneDto,
  ) {
    const milestone = {
      title: createMilestoneDto.title,
      description: createMilestoneDto.description,
      phaseId: new PhaseId(createMilestoneDto.phaseId),
    };
    return milestone;
  }

  static updateMilestoneDtoToDomainInput(
    updateMilestoneDto: UpdateMilestoneDto,
  ) {
    const milestone: Partial<Milestone> = {
      title: updateMilestoneDto.title,
      description: updateMilestoneDto.description,
      phaseId: updateMilestoneDto.phaseId
        ? new PhaseId(updateMilestoneDto.phaseId)
        : undefined,
    };
    return milestone;
  }

  static persistenceToDomainEntity(milestone: MilestoneDocument) {
    return new Milestone(
      milestone._id.toHexString(),
      milestone.title,
      milestone.description,
      new PhaseId(milestone.phaseId.id.toHexString(), milestone.phaseId.title),
      milestone.createdAt,
      milestone.updatedAt,
    );
  }
}

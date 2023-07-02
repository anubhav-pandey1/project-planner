import {
  CreatePhaseDto,
  UpdatePhaseDto,
} from 'src/plans/phases/api/rest/dto/phase.dto';
import {
  MilestoneId,
  Phase,
} from 'src/plans/phases/domain/entities/phase.entity';
import { PhaseDocument } from 'src/plans/phases/data/schemas/phase.schema';
export class PhaseMapper {
  static createPhaseDtoToDomainInput(createPhaseDto: CreatePhaseDto) {
    const phase: Partial<Phase> = {
      title: createPhaseDto.title,
      description: createPhaseDto.description,
    };
    return phase;
  }

  static updatePhaseDtoToDomainInput(updatePhaseDto: UpdatePhaseDto) {
    const phase: Partial<Phase> = {
      title: updatePhaseDto.title,
      description: updatePhaseDto.description,
    };
    return phase;
  }

  static persistenceToDomainEntity(phase: PhaseDocument) {
    const milestoneIds = phase.milestoneIds.map(
      (milestoneId) =>
        new MilestoneId(milestoneId.id.toHexString(), milestoneId.title),
    );
    return new Phase(
      phase._id.toHexString(),
      phase.title,
      phase.description,
      milestoneIds,
      phase.createdAt,
      phase.updatedAt,
    );
  }
}

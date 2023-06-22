import {
  CreatePhaseDto,
  UpdatePhaseDto,
} from 'src/plans/phases/api/rest/dto/phase.dto';
import {
  MilestoneReference,
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
    const milestones = phase.milestones.map(
      (milestone) =>
        new MilestoneReference(milestone._id.toHexString(), milestone.title),
    );
    return new Phase(
      phase._id.toHexString(),
      phase.title,
      phase.description,
      milestones,
      phase.createdAt,
      phase.updatedAt,
    );
  }
}

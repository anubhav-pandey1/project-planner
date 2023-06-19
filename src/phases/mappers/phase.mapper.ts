import {
  CreatePhaseDto,
  UpdatePhaseDto,
} from 'src/phases/api/rest/dto/phase.dto';
import { Phase } from 'src/phases/domain/entities/phase.entity';
import { PhaseDocument } from 'src/phases/data/schemas/phase.schema';
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
    return new Phase(
      phase._id.toHexString(),
      phase.title,
      phase.description,
      phase.createdAt,
      phase.updatedAt,
    );
  }
}

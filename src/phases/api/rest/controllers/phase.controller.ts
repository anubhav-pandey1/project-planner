import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { PhaseService } from 'src/phases/domain/services/phase.service';
import {
  CreatePhaseDto,
  UpdatePhaseDto,
} from 'src/phases/api/rest/dto/phase.dto';
import { PhaseMapper } from 'src/phases/mappers/phase.mapper';

@Controller('phase')
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

  @Get()
  findAll() {
    return this.phaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phaseService.findOne(id);
  }

  @Post()
  create(@Body() createPhaseDto: CreatePhaseDto) {
    const createPhaseInput =
      PhaseMapper.createPhaseDtoToDomainInput(createPhaseDto);
    return this.phaseService.create(createPhaseInput);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto) {
    const updatePhaseInput =
      PhaseMapper.updatePhaseDtoToDomainInput(updatePhaseDto);
    return this.phaseService.updateOne(id, updatePhaseInput);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.phaseService.delete(id);
  }
}

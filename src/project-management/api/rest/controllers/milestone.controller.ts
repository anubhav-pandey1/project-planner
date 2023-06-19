import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MilestoneService } from 'src/project-management/domain/services/milestone.service';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
} from 'src/project-management/api/rest/dto/milestone.dto';
import { MilestoneMapper } from 'src/project-management/mappers/milestone.mapper';

@Controller('milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }

  @Post()
  create(@Body() createMilestoneDto: CreateMilestoneDto) {
    const createMilestoneInput =
      MilestoneMapper.createMilestoneDtoToDomainInput(createMilestoneDto);
    return this.milestoneService.create(createMilestoneInput);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
  ) {
    const updateMilestoneInput =
      MilestoneMapper.updateMilestoneDtoToDomainInput(updateMilestoneDto);
    return this.milestoneService.updateOne(id, updateMilestoneInput);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.milestoneService.delete(id);
  }
}

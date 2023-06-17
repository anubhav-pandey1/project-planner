import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MilestoneService } from '../services/milestone.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from '../dto/milestone.dto';

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
    return this.milestoneService.create(createMilestoneDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestoneService.updateOne(id, updateMilestoneDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.milestoneService.delete(id);
  }
}

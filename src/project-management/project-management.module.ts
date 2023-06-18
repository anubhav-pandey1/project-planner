import { Module } from '@nestjs/common';
import { MilestoneController } from './api/rest/controllers/milestone.controller';
import { MilestoneService } from './domain/services/milestone.service';
import { MilestoneRepository } from './data/repositories/milestone.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MilestoneModel,
  MilestoneSchema,
} from './data/schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MilestoneModel.name, schema: MilestoneSchema },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService, MilestoneRepository],
})
export class ProjectManagementModule {}

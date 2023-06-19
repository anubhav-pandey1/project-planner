import { Module } from '@nestjs/common';
import { MilestoneController } from 'src/project-management/api/rest/controllers/milestone.controller';
import { MilestoneService } from 'src/project-management/domain/services/milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MilestoneModel,
  MilestoneSchema,
} from 'src/project-management/data/schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MilestoneModel.name, schema: MilestoneSchema },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class ProjectManagementModule {}

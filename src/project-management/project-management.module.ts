import { Module } from '@nestjs/common';
import { MilestoneController } from './controllers/milestone.controller';
import { MilestoneService } from './services/milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Milestone.name, schema: MilestoneSchema },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class ProjectManagementModule {}

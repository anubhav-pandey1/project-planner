import { Module } from '@nestjs/common';
import { MilestoneController } from 'src/milestones/api/rest/controllers/milestone.controller';
import { MilestoneService } from 'src/milestones/domain/services/milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MilestoneModel,
  MilestoneSchema,
} from 'src/milestones/data/schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MilestoneModel.name, schema: MilestoneSchema },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class MilestonesModule {}

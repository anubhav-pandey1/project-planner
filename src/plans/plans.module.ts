import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhaseController } from 'src/plans/phases/api/rest/controllers/phase.controller';
import { PhaseService } from 'src/plans/phases/domain/services/phase.service';
import {
  PhaseModel,
  PhaseSchema,
} from 'src/plans/phases/data/schemas/phase.schema';
import { MilestoneController } from 'src/plans/milestones/api/rest/controllers/milestone.controller';
import { MilestoneService } from 'src/plans/milestones/domain/services/milestone.service';
import {
  MilestoneModel,
  MilestoneSchema,
} from 'src/plans/milestones/data/schemas/milestone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhaseModel.name, schema: PhaseSchema }]),
    MongooseModule.forFeature([
      { name: MilestoneModel.name, schema: MilestoneSchema },
    ]),
  ],
  controllers: [PhaseController, MilestoneController],
  providers: [PhaseService, MilestoneService],
})
export class PlansModule {}

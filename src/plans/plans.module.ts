import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { KafkaModule } from 'src/common/kafka/kafka.module';
import { MilestoneEventsConsumer } from 'src/plans/phases/domain/handlers/milestone.handler';
import { PhaseEventsConsumer } from 'src/plans/milestones/domain/handlers/phase.handler';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['src/plans/.env'] }),
    MongooseModule.forFeature([{ name: PhaseModel.name, schema: PhaseSchema }]),
    MongooseModule.forFeature([
      { name: MilestoneModel.name, schema: MilestoneSchema },
    ]),
    // Custom Common Modules
    KafkaModule,
  ],
  controllers: [PhaseController, MilestoneController],
  providers: [
    PhaseService,
    MilestoneService,
    MilestoneEventsConsumer,
    PhaseEventsConsumer,
  ],
})
export class PlansModule {}

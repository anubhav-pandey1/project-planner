import { Module } from '@nestjs/common';
import { PhaseController } from 'src/phases/api/rest/controllers/phase.controller';
import { PhaseService } from 'src/phases/domain/services/phase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhaseModel, PhaseSchema } from 'src/phases/data/schemas/phase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhaseModel.name, schema: PhaseSchema }]),
  ],
  controllers: [PhaseController],
  providers: [PhaseService],
})
export class PhasesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MilestonesModule } from 'src/milestones/milestones.module';
import { PhasesModule } from 'src/phases/phases.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {}),
    MilestonesModule,
    PhasesModule,
  ],
})
export class AppModule {}

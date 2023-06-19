import { Module } from '@nestjs/common';
import { MilestonesModule } from 'src/milestones/milestones.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MilestonesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {}),
  ],
})
export class AppModule {}

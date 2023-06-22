import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlansModule } from 'src/plans/plans.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {}),
    PlansModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PlansModule } from 'src/plans/plans.module';

@Module({
  imports: [
    // NestJS Modules
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {}),

    // Bounded Context Modules
    PlansModule,
  ],
})
export class AppModule {}

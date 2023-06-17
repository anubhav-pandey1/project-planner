import { Module } from '@nestjs/common';
import { ProjectManagementModule } from './project-management/project-management.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProjectManagementModule,
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {}),
  ],
})
export class AppModule {}

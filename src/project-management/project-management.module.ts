import { Module } from '@nestjs/common';
import { ProjectManagementController } from './controllers/project-management.controller';
import { ProjectManagementService } from './services/project-management.service';

@Module({
  controllers: [ProjectManagementController],
  providers: [ProjectManagementService],
})
export class ProjectManagementModule {}

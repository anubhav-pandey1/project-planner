import { Controller, Get, Param } from '@nestjs/common';
import { ProjectManagementService } from '../services/project-management.service';

@Controller('project-management')
export class ProjectManagementController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Get(':key')
  getHello(@Param('key') key?: number): string {
    console.log(`Received parameter: ${key}`);
    return this.projectManagementService
      .getHello()
      .concat(`Received parameter: ${key}`);
  }
}

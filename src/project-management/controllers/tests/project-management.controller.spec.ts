import { Test, TestingModule } from '@nestjs/testing';
import { ProjectManagementController } from '../project-management.controller';
import { ProjectManagementService } from '../../services/project-management.service';

describe('ProjectManagementController', () => {
  let controller: ProjectManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectManagementController],
      providers: [ProjectManagementService],
    }).compile();

    controller = module.get<ProjectManagementController>(
      ProjectManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        expect(controller.getHello(123)).toBe(
          'Hello World!Received parameter: 123',
        ),
      );
    });
  });
});

export class CreateMilestoneDto {
  readonly title: string;
  readonly description: string;
  readonly phaseId: string;
}

export class UpdateMilestoneDto {
  readonly title?: string;
  readonly description?: string;
  readonly phaseId?: string;
}

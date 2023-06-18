export class CreateMilestoneDto {
  readonly title: string;
  readonly description: string;
}

export class UpdateMilestoneDto {
  readonly title?: string;
  readonly description?: string;
}

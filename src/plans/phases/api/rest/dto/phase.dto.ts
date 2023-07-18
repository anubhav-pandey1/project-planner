export class CreatePhaseDto {
  readonly title: string;
  readonly description: string;
}

export class UpdatePhaseDto {
  readonly title?: string;
  readonly description?: string;
}

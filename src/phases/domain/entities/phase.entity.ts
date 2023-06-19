export class Phase {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly createdAt?: string | boolean,
    private readonly updatedAt?: string | boolean,
  ) {}
}

export class MilestoneReference {
  constructor(readonly id: string, readonly title: string) {}
}

export class Phase {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly milestones?: MilestoneReference[],
    readonly createdAt?: string | boolean,
    readonly updatedAt?: string | boolean,
  ) {}
}

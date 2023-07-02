export class MilestoneId {
  constructor(readonly id: string, readonly title: string) {}
}

export class Phase {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly milestoneIds: MilestoneId[] = [],
    readonly createdAt?: string | boolean,
    readonly updatedAt?: string | boolean,
  ) {}
}

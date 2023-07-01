export class PhaseId {
  constructor(readonly id: string, readonly title?: string) {}
}

export class Milestone {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly phaseId: PhaseId,
    readonly createdAt?: string | boolean,
    readonly updatedAt?: string | boolean,
  ) {
    if (!id) {
      throw new Error('Milestone id is required');
    }

    if (!phaseId) {
      throw new Error('Milestone phaseId is required');
    }
  }
}

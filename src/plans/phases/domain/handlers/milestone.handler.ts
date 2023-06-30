import { KafkaMessage } from 'kafkajs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/common/kafka/services/consumer.service';
import { PhaseService } from 'src/plans/phases/domain/services/phase.service';

@Injectable()
export class MilestoneEventsConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly phaseService: PhaseService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'milestone' },
      config: { groupId: 'PhaseService' },
      onMessage: async (message) => {
        await this.handleEvent(message);
      },
    });
  }

  private async handleEvent(message: KafkaMessage) {
    if (!message.value) return;
    const messageType = JSON.parse(message.value?.toString()).type;
    const messagePayload = JSON.parse(message.value?.toString()).payload;
    switch (messageType) {
      case 'MILESTONE_TAGGED_TO_PHASE':
        this.phaseService.handleMilestoneTaggedToPhase(
          messagePayload.milestoneId,
          messagePayload.oldPhaseId,
          messagePayload.newPhaseId,
        );
        break;
      default:
        break;
    }
  }
}

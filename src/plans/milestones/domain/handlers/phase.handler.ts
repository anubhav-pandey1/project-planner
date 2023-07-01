import { KafkaMessage } from 'kafkajs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/common/kafka/services/consumer.service';
import { MilestoneService } from 'src/plans/milestones/domain/services/milestone.service';

@Injectable()
export class PhaseEventsConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly milestoneService: MilestoneService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'phase' },
      config: { groupId: 'MilestoneService' },
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
      case 'PHASE_DELETED':
        await this.milestoneService.handlePhaseDeleted(messagePayload.phaseId);
        break;
      default:
        break;
    }
  }
}

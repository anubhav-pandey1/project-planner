import { Message } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';

import { KafkajsProducer } from 'src/common/kafka/kafkajs/producer.kafkajs';
import { IProducer } from 'src/common/kafka/interfaces/producer.interface';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();

  constructor(private readonly configService: ConfigService) {}

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get('KAFKA_BROKER') as string,
      );
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}

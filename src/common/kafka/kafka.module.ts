import { Module } from '@nestjs/common';
import { ProducerService } from 'src/common/kafka/services/producer.service';
import { ConsumerService } from 'src/common/kafka/services/consumer.service';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}

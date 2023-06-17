import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MilestoneDocument = HydratedDocument<Milestone>;

@Schema()
export class Milestone {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);

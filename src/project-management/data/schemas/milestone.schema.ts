import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'milestones', timestamps: true })
export class MilestoneModel {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export type MilestoneDocument = HydratedDocument<MilestoneModel>;
export const MilestoneSchema = SchemaFactory.createForClass(MilestoneModel);

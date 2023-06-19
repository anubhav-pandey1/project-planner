import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

@Schema({ collection: 'milestones', timestamps: true })
export class MilestoneModel {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export type MilestoneDocument = HydratedDocument<MilestoneModel> &
  SchemaTimestampsConfig; // Temporary fix for incorrect type definition in Mongoose
export const MilestoneSchema = SchemaFactory.createForClass(MilestoneModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

@Schema({ collection: 'milestones', timestamps: true })
export class MilestoneModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: { id: Types.ObjectId, title: String },
    ref: 'PhaseModel',
    _id: false,
    required: true,
  })
  phaseId: { id: Types.ObjectId; title: string };
}

export type MilestoneDocument = HydratedDocument<MilestoneModel> &
  SchemaTimestampsConfig; // Temporary fix for incorrect type definition in Mongoose
export const MilestoneSchema = SchemaFactory.createForClass(MilestoneModel);

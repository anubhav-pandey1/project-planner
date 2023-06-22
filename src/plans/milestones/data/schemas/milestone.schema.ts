import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { PhaseDocument } from 'src/plans/phases/data/schemas/phase.schema';

@Schema({ collection: 'milestones', timestamps: true })
export class MilestoneModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'PhaseModel' })
  phase: PhaseDocument;
}

export type MilestoneDocument = HydratedDocument<MilestoneModel> &
  SchemaTimestampsConfig; // Temporary fix for incorrect type definition in Mongoose
export const MilestoneSchema = SchemaFactory.createForClass(MilestoneModel);

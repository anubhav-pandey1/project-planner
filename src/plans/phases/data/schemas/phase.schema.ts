import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { MilestoneDocument } from 'src/plans/milestones/data/schemas/milestone.schema';

@Schema({ collection: 'phases', timestamps: true })
export class PhaseModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MilestoneModel' }] })
  milestones: MilestoneDocument[];
}

export type PhaseDocument = HydratedDocument<PhaseModel> &
  SchemaTimestampsConfig; // Temporary fix for incorrect type definition in Mongoose
export const PhaseSchema = SchemaFactory.createForClass(PhaseModel);

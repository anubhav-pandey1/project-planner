import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

@Schema({ collection: 'phases', timestamps: true })
export class PhaseModel {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export type PhaseDocument = HydratedDocument<PhaseModel> &
  SchemaTimestampsConfig; // Temporary fix for incorrect type definition in Mongoose
export const PhaseSchema = SchemaFactory.createForClass(PhaseModel);

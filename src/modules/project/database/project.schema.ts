import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  members: string[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: String, default: '' })
  mainImage: string;

  @Prop({ type: Boolean, default: false })
  isFeatured: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project); 
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OurServiceDocument = OurService & Document;

@Schema({ timestamps: true })
export class OurService {
    @Prop({ type: String,required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, default: null })
    image: string;

    @Prop({
        type: Date,
        default: null
    })
    deletedAt?: Date;
}

export const OurServiceSchema = SchemaFactory.createForClass(OurService);

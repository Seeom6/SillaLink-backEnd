import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop() 
    firstName?: string;

    @Prop()
    lastName?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
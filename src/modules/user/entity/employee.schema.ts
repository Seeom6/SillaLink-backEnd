import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({_id: false})
export class Employee {

    @Prop({type: String})
    position: string;

    @Prop({type: Date})
    startDate: Date;

    @Prop({type: Date})
    endDate?: Date;

    @Prop({ type: String, default: null})
    image: string

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
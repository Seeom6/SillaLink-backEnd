import { BaseValidationPipe } from "@Package/api";
import { z } from "zod";

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    position: z.string(),
    image: z.string().optional()
})

export class CreateEmployeeValidation extends BaseValidationPipe {
    constructor(){
        super(schema)
    }
}
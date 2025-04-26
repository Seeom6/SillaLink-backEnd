import { LogInDto } from '../dto/request/logIn.dto';
import { z } from 'zod';
import {BaseValidationPipe} from "@Package/api";


export class LogInValidationPipe extends BaseValidationPipe<LogInDto>{
  constructor() {
    super(z.object({
      email: z.string().email(),
      password: z.string()
    }));
  }
}
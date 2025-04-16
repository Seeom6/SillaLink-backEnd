import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { LogInDto } from '../dto/request/logIn.dto';
import { z } from 'zod';


export class LogInValidationPipe implements PipeTransform {
  transform(value: LogInDto, metadata: ArgumentMetadata) {
    const schema = z.object({
      email: z.string().email(),
      password: z.string()
    })
    const result = schema.safeParse(value)
    if(result.error){
      throw new BadRequestException(result.error)
    }
    return result.data;
  }

}
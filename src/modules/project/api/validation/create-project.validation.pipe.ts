import { Injectable } from '@nestjs/common';
import { BaseValidationPipe } from '@Package/api';
import { z } from 'zod';
import { CreateProjectDto } from '../dto/request/create-project.dto';

const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

@Injectable()
export class CreateProjectValidationPipe extends BaseValidationPipe<typeof CreateProjectSchema> {
  constructor() {
    super(CreateProjectSchema);
  }
} 
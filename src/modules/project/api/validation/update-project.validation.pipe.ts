import { Injectable } from '@nestjs/common';
import { BaseValidationPipe } from '@Package/api';
import { z } from 'zod';

const UpdateProjectDto = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  members: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  mainImage: z.string(),
  isFeatured: z.boolean().optional().default(false),
  link: z.string()
});

@Injectable()
export class UpdateProjectValidation extends BaseValidationPipe {
  constructor() {
    super(UpdateProjectDto);
  }
} 
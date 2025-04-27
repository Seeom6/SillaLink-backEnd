import { Injectable } from '@nestjs/common';
import { BaseValidationPipe } from '@Package/api';
import { z } from 'zod';

const UpdateProjectDto = z.object({
  name: z.string().min(1, 'Project name is required').optional(),
  description: z.string().optional(),
});

@Injectable()
export class UpdateProjectValidationPipe extends BaseValidationPipe {
  constructor() {
    super(UpdateProjectDto);
  }
} 
import { Injectable } from '@nestjs/common';
import { BaseValidationPipe } from '@Package/api';
import { z } from 'zod';

const ResetPasswordDto = z.object({
    newPassword: z.string().min(8),
});

@Injectable()
export class ResetPasswordValidationPipe extends BaseValidationPipe {
    constructor() {
        super(ResetPasswordDto);
    }
} 
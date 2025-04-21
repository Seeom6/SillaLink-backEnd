import { Injectable } from '@nestjs/common';
import { BaseValidationPipe } from '@Package/api';
import { z } from 'zod';

const RequestPasswordResetDto = z.object({
    email: z.string().email(),
});

@Injectable()
export class RequestPasswordResetValidationPipe extends BaseValidationPipe {
    constructor() {
        super(RequestPasswordResetDto);
    }
} 
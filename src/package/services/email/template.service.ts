import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailTemplateService {
    private readonly templatesDir = path.join(process.cwd(), 'public','email', 'templates');

    async getWelcomeTemplate(otp: string): Promise<string> {
        return this.processTemplate('welcome.html', { otp });
    }

    async getSigninTemplate(otp: string): Promise<string> {
        return this.processTemplate('signin.html', { otp });
    }

    private async processTemplate(templateName: string, data: Record<string, string>): Promise<string> {
        const templatePath = path.join(this.templatesDir, templateName);
        let html = await fs.promises.readFile(templatePath, 'utf-8');

        Object.entries(data).forEach(([key, value]) => {
            html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });

        return html;
    }
} 
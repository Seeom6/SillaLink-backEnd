// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import  * as nodemailer from 'nodemailer';
import {EnvironmentService} from "@Package/config";
import {ConfigService} from "@nestjs/config";
import {AppError} from "@Package/error";
import {CodeErrors} from "@Modules/shared";
import { EmailTemplateService } from './template.service';

@Injectable()
export class MailService {
    private readonly emailTemplateService: EmailTemplateService = new EmailTemplateService();
    private transporter: nodemailer.Transporter;
    constructor(private readonly env: EnvironmentService) {
        this.transporter = nodemailer.createTransport({
            host: env.get("mail.host"),
            port: Number(env.get("mail.port")) ,
            secure: false,
            auth: {
                user: env.get("mail.user"),
                pass: env.get("mail.password"),
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            const mailOptions = {
                from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
                to,
                subject,
                html,
            };

            return await this.transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e)
            throw new AppError({
                code: CodeErrors.MAIL_ERROR,
                message: `error in send email : ${e.message}`
            })
        }
    }

    async sendSingInOTP(to: string, otp: string) {
        const html = await this.emailTemplateService.getSigninTemplate(otp);
        return await this.sendMail(to, "OTP for verification", html);
    }

    async sendPasswordResetEmail(to: string, otp: string) {
        const html = await this.emailTemplateService.getPasswordResetTemplate(otp);
        return await this.sendMail(to, "Reset Your Password", html);
    }
}

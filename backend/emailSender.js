import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class RealEmailSender {
    constructor() {
        this.host = process.env.SMTP_HOST || 'smtp.gmail.com';
        this.port = parseInt(process.env.SMTP_PORT) || 587;
        this.user = process.env.SMTP_USER || 'liutex@sciengasummits.com';
        this.pass = process.env.SMTP_PASS || 'wejr dtuq bbwc been';

        // Create reusable transporter using nodemailer
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
            auth: {
                user: this.user,
                pass: this.pass,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certs if any
            },
            connectionTimeout: 15000, // 15s to connect
            greetingTimeout: 10000,   // 10s for greeting
            socketTimeout: 20000,     // 20s socket timeout
        });
    }

    async sendEmail(to, subject, htmlContent, otp) {
        try {
            console.log(`📧 Attempting to send email via nodemailer to: ${to}`);

            const info = await this.transporter.sendMail({
                from: `"Conference Management System" <${this.user}>`,
                to: to,
                subject: subject,
                html: htmlContent,
                text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
            });

            console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
            console.log(`📧 OTP delivered: ${otp}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error(`❌ Nodemailer error:`, error.message);
            return { success: false, error: error.message };
        }
    }
}
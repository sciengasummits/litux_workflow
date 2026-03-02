import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class RealEmailSender {
    constructor() {
        this.user = process.env.SMTP_USER || 'liutex@sciengasummits.com';
        this.pass = (process.env.SMTP_PASS || 'piet meud pzjw rlak').replace(/\s/g, ''); // strip spaces from App Password

        // Use Gmail service preset — automatically uses correct host/port/security
        // Port 465 (SSL) works on Render; port 587 (STARTTLS) is blocked
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.user,
                pass: this.pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendEmail(to, subject, htmlContent, otp) {
        try {
            console.log(`📧 Attempting Gmail send to: ${to} (user: ${this.user})`);

            const info = await this.transporter.sendMail({
                from: `"Conference Management System" <${this.user}>`,
                to: to,
                subject: subject,
                html: htmlContent,
                text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
            });

            console.log(`✅ Email sent! Message ID: ${info.messageId}`);
            console.log(`📧 OTP delivered: ${otp}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error(`❌ Nodemailer Gmail error:`, error.message);
            return { success: false, error: error.message };
        }
    }
}
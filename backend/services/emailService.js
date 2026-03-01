import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for sending emails
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Generate a 4-digit OTP
export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, username) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.FROM_EMAIL || 'noreply@sciengasummits.com',
            to: email,
            subject: 'Your Login OTP - Conference Management System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Conference Management System</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">LIUTEX SUMMIT 2026</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
                        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Your Login OTP</h2>
                        <p style="color: #64748b; margin: 0 0 20px 0;">
                            Hello! You've requested to login to the Conference Management System with username: <strong>${username}</strong>
                        </p>
                        
                        <div style="background: white; border: 2px solid #6366f1; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                            <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Your 4-digit OTP is:</p>
                            <div style="font-size: 32px; font-weight: bold; color: #6366f1; letter-spacing: 8px; font-family: monospace;">${otp}</div>
                        </div>
                        
                        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <p style="color: #92400e; margin: 0; font-size: 14px;">
                                <strong>⚠️ Important:</strong> This OTP is valid for <strong>10 minutes</strong> only. 
                                Do not share this code with anyone.
                            </p>
                        </div>
                        
                        <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                            If you didn't request this OTP, please ignore this email or contact support.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 20px;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                            © 2026 LIUTEX VORTEX SUMMIT. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${email} for user ${username}`);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('❌ Failed to send OTP email:', error);
        return { success: false, error: error.message };
    }
};

// Test email configuration
export const testEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email configuration is valid');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        return false;
    }
};
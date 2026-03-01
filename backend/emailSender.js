import net from 'net';
import tls from 'tls';
import dotenv from 'dotenv';

dotenv.config();

export class RealEmailSender {
    constructor() {
        this.host = process.env.SMTP_HOST || 'smtp.gmail.com';
        this.port = parseInt(process.env.SMTP_PORT) || 587;
        this.user = process.env.SMTP_USER || 'liutex@sciengasummits.com';
        this.pass = process.env.SMTP_PASS || 'wejr dtuq bbwc been';
    }

    async sendEmail(to, subject, htmlContent, otp) {
        return new Promise((resolve, reject) => {
            console.log(`📧 ATTEMPTING REAL SMTP CONNECTION TO: ${this.host}:${this.port}`);
            
            const socket = net.createConnection(this.port, this.host);
            let response = '';
            let step = 0;
            
            socket.on('data', (data) => {
                response += data.toString();
                console.log(`📧 SMTP RESPONSE: ${data.toString().trim()}`);
                
                try {
                    if (step === 0 && response.includes('220')) {
                        // Server ready, send EHLO
                        socket.write('EHLO localhost\r\n');
                        step = 1;
                        response = '';
                    } else if (step === 1 && response.includes('250')) {
                        // EHLO successful, start TLS
                        socket.write('STARTTLS\r\n');
                        step = 2;
                        response = '';
                    } else if (step === 2 && response.includes('220')) {
                        // TLS ready, upgrade connection
                        const tlsSocket = tls.connect({
                            socket: socket,
                            host: this.host,
                            rejectUnauthorized: false
                        });
                        
                        tlsSocket.write('EHLO localhost\r\n');
                        step = 3;
                        response = '';
                        
                        tlsSocket.on('data', (data) => {
                            response += data.toString();
                            console.log(`📧 TLS RESPONSE: ${data.toString().trim()}`);
                            
                            if (step === 3 && response.includes('250')) {
                                // Start authentication
                                tlsSocket.write('AUTH LOGIN\r\n');
                                step = 4;
                                response = '';
                            } else if (step === 4 && response.includes('334')) {
                                // Send username
                                const username = Buffer.from(this.user).toString('base64');
                                tlsSocket.write(username + '\r\n');
                                step = 5;
                                response = '';
                            } else if (step === 5 && response.includes('334')) {
                                // Send password
                                const password = Buffer.from(this.pass).toString('base64');
                                tlsSocket.write(password + '\r\n');
                                step = 6;
                                response = '';
                            } else if (step === 6 && response.includes('235')) {
                                // Authentication successful, send email
                                console.log(`✅ SMTP AUTHENTICATION SUCCESSFUL`);
                                
                                // Send MAIL FROM
                                tlsSocket.write(`MAIL FROM:<${this.user}>\r\n`);
                                step = 7;
                                response = '';
                            } else if (step === 7 && response.includes('250')) {
                                // Send RCPT TO
                                tlsSocket.write(`RCPT TO:<${to}>\r\n`);
                                step = 8;
                                response = '';
                            } else if (step === 8 && response.includes('250')) {
                                // Send DATA
                                tlsSocket.write('DATA\r\n');
                                step = 9;
                                response = '';
                            } else if (step === 9 && response.includes('354')) {
                                // Send email content
                                const emailContent = [
                                    `From: Conference Management System <${this.user}>`,
                                    `To: ${to}`,
                                    `Subject: ${subject}`,
                                    `Content-Type: text/html; charset=UTF-8`,
                                    ``,
                                    htmlContent,
                                    ``,
                                    `Your OTP: ${otp}`,
                                    '.'
                                ].join('\r\n');
                                
                                tlsSocket.write(emailContent + '\r\n');
                                step = 10;
                                response = '';
                            } else if (step === 10 && response.includes('250')) {
                                // Email sent successfully
                                console.log(`✅ EMAIL SENT SUCCESSFULLY TO: ${to}`);
                                console.log(`📧 OTP: ${otp}`);
                                tlsSocket.write('QUIT\r\n');
                                tlsSocket.end();
                                resolve({ success: true, messageId: `real-${Date.now()}` });
                            }
                        });
                        
                        tlsSocket.on('error', (err) => {
                            console.error(`❌ TLS ERROR:`, err.message);
                            resolve({ success: false, error: err.message });
                        });
                    }
                } catch (err) {
                    console.error(`❌ SMTP ERROR:`, err.message);
                    resolve({ success: false, error: err.message });
                }
            });
            
            socket.on('error', (err) => {
                console.error(`❌ SOCKET ERROR:`, err.message);
                resolve({ success: false, error: err.message });
            });
            
            socket.on('close', () => {
                console.log(`📧 SMTP CONNECTION CLOSED`);
            });
        });
    }
}
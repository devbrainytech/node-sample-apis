import nodemailer from 'nodemailer';

/**
 * Email Service
 * Handles email sending functionality using nodemailer with SMTP
 */

/**
 * Nodemailer transporter configuration
 * Uses environment variables for SMTP settings
 */
const transporter = nodemailer.createTransport({
  host: process.env['SMTP_HOST'],
  port: Number(process.env['SMTP_PORT']),
  secure: false, // Change to false for TLS
  requireTLS: true, // Add this line
  tls: {
    rejectUnauthorized: false, // Add this for development
  },
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASSWORD'],
  },
});

/**
 * Sends an email using configured SMTP transport
 * @param to Recipient email address
 * @param subject Email subject line
 * @param html Email body content in HTML format
 * @returns Promise<SentMessageInfo> Nodemailer send result
 * @throws Error when email sending fails
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env['SMTP_FROM'],
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

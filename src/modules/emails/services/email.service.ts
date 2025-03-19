import EmailLayout from '../models/EmailLayout';
import EmailTemplate from '../models/EmailTemplate';
import EmailTrigger from '../models/EmailTrigger';
import nodemailer from 'nodemailer';

/**
 * Service class for handling email-related operations.
 * @class EmailService
 * @constructor
 * @returns {EmailService} The email service instance.
 * @method sendEmailByTrigger
 * @param {string} action - The action for which the email is being sent.
 * @param {string} recipientEmail - The email address of the recipient.
 * @param {Record<string, string>} variables - The variables to be used in the email template.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Set up associations
    // EmailTemplate.belongsTo(EmailLayout, { foreignKey: 'layout_id', as: 'layout' });
    // EmailLayout.hasMany(EmailTemplate, { foreignKey: 'layout_id', as: 'templates' });
    // EmailTrigger.belongsTo(EmailTemplate, { foreignKey: 'template_id', as: 'template' });

    this.transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: parseInt(process.env['SMTP_PORT'] || '587'),
      secure: false,
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASSWORD'],
      },
    });
  }

  /**
   * Sends an email using the provided email template and variables.
   * @param {string} templateId - The ID of the email template to use.
   * @param {string} recipientEmail - The email address of the recipient.
   * @param {Record<string, string>} variables - The variables to be used in the email template.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   */
  async sendEmailByTrigger(
    action: string,
    recipientEmail: string,
    variables: Record<string, string>
  ) {
    const trigger = await EmailTrigger.findOne({
      where: { action, is_active: true },
      include: [
        {
          model: EmailTemplate,
          as: 'templateDetails',
          include: [
            {
              model: EmailLayout,
              as: 'layoutDetails',
              where: { is_active: true },
            },
          ],
        },
      ],
    });

    if (!trigger) {
      throw new Error(`No active email trigger found for action: ${action}`);
    }

    const template_id = trigger.template_id;
    const template = await EmailTemplate.findByPk(template_id);
    const layout_id = template!.layout_id;
    const layout = await EmailLayout.findByPk(layout_id);

    variables['subject'] = template!.subject;

    // Replace variables in template
    const finalContent = template!.body_content;

    let fullContent = `${layout!.header}${finalContent}${layout!.footer}`;

    Object.entries(variables).forEach(([key, value]) => {
      fullContent = fullContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    await this.transporter.sendMail({
      from: process.env['SMTP_FROM_EMAIL'],
      to: recipientEmail,
      subject: template!.subject,
      html: fullContent,
    });
  }
}

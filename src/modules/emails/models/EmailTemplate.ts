import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import EmailLayout from './EmailLayout';

interface EmailTemplateAttributes {
  id: number;
  name: string;
  subject: string;
  body_content: string;
  layout_id: number;
  template_variables: JSON;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

/**
 * Model representing an email template.
 * @class EmailTemplate
 * @constructor
 * @returns {EmailTemplate} The email template instance.
 * @property {number} id - The ID of the email template.
 * @property {string} name - The name of the email template.
 * @property {string} subject - The subject of the email template.
 * @property {string} body_content - The body content of the email template.
 * @property {number} layout_id - The ID of the email layout associated with the template.
 * @property {JSON} template_variables - The variables used in the email template.
 * @property {boolean} is_active - Indicates whether the email template is active.
 * @property {Date} created_at - The timestamp when the email template was created.
 * @property {Date} updated_at - The timestamp when the email template was last updated.
 * @returns {void}
 */
class EmailTemplate extends Model<EmailTemplateAttributes> implements EmailTemplateAttributes {
  declare id: number;
  declare name: string;
  declare subject: string;
  declare body_content: string;
  declare layout_id: number;
  declare template_variables: JSON;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

EmailTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    body_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    layout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template_variables: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'email_templates',
    underscored: true,
  }
);
// Create a separate file for associations
export const initializeAssociations = () => {
  EmailTemplate.belongsTo(EmailLayout, {
    foreignKey: 'layout_id',
    as: 'layout',
  });
};

export default EmailTemplate;

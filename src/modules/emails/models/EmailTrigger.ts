import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import EmailTemplate from './EmailTemplate';

/**
 * Model representing an email trigger.
 * @class EmailTrigger
 * @constructor
 * @returns {EmailTrigger} The email trigger instance.
 * @property {number} id - The ID of the email trigger.
 * @property {string} action - The action associated with the email trigger.
 * @property {number} template_id - The ID of the email template associated with the trigger.
 * @property {boolean} is_active - Indicates whether the email trigger is active.
 * @property {Date} created_at - The timestamp when the email trigger was created.
 * @property {Date} updated_at - The timestamp when the email trigger was last updated.
 * @property {EmailTemplate} template - The email template associated with the trigger.
 * @returns {void}
 */
interface EmailTriggerAttributes {
  id: number;
  action: string;
  template_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

class EmailTrigger extends Model<EmailTriggerAttributes> implements EmailTriggerAttributes {
  declare id: number;
  declare action: string;
  declare template_id: number;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

EmailTrigger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'email_triggers',
    underscored: true,
  }
);

// Define associations
EmailTrigger.belongsTo(EmailTemplate, {
  foreignKey: 'template_id',
  as: 'template',
});

export default EmailTrigger;

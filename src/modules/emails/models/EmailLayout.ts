import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import EmailTemplate from './EmailTemplate';

/**
 * Model representing an email layout.
 * @class EmailLayout
 * @constructor
 * @returns {EmailLayout} The email layout instance.
 * @property {number} id - The ID of the email layout.
 * @property {string} header - The header content of the email layout.
 * @property {string} footer - The footer content of the email layout.
 * @property {boolean} is_active - Indicates whether the email layout is active.
 * @returns {void}
 */
interface EmailLayoutAttributes {
  id: number;
  header: string;
  footer: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

class EmailLayout extends Model<EmailLayoutAttributes> implements EmailLayoutAttributes {
  declare id: number;
  declare header: string;
  declare footer: string;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

EmailLayout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    header: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    footer: {
      type: DataTypes.TEXT,
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
    tableName: 'email_layouts',
    underscored: true,
  }
);

export default EmailLayout;

// Add this to your existing EmailLayout model
EmailLayout.hasMany(EmailTemplate, {
  foreignKey: 'layout_id',
  as: 'templates',
});

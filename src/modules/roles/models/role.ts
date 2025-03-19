import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

/**
 * Role Model
 * Represents role entity in the database with Sequelize ORM
 */

/**
 * Interface defining Role attributes
 */
interface RoleAttributes {
  id: number;
  roles: string;
  permissions: string;
  updated_at: Date;
}

/**
 * Role Model Class
 * Extends Sequelize Model with RoleAttributes interface
 */
class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public roles!: string;
  public permissions!: string;
  public updated_at!: Date;
}

/**
 * Initialize Role Model
 * @param sequelize Sequelize instance
 * @param DataTypes Sequelize DataTypes
 * @description Initializes Role Model with Sequelize
 */
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roles: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false,
  }
);

export default Role;

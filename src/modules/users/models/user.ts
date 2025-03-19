import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';

/**
 * User Model
 * Represents user entity in the database with Sequelize ORM
 */

/**
 * Interface defining User attributes
 */
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  date_of_birth: Date;
  contact_no: string;
  driving_licance: string;
  user_status: string;
  user_registered: Date;
  otp: string | null;
  otp_expired_at: Date | null;
}

/**
 * User Model Class
 * Extends Sequelize Model with UserAttributes interface
 */
class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare first_name: string | null;
  declare last_name: string | null;
  declare display_name: string;
  declare gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  declare date_of_birth: Date;
  declare contact_no: string;
  declare driving_licance: string;
  declare user_status: string;
  declare user_registered: Date;
  declare otp: string | null;
  declare otp_expired_at: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  /**
   * Define associations with other models
   * @param models Sequelize models
   */
  static associate(models: any) {
    // User to Role - Many-to-Many relationship
    User.belongsToMany(models.Role, {
      through: 'users_roles',
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles',
    });
  }
}

/**
 * Initialize User Model
 * @param sequelize Sequelize instance
 * @returns User Model
 * @description Initializes User Model with Sequelize
 */
User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    display_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contact_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    driving_licance: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '1',
    },
    user_registered: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    otp_expired_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;

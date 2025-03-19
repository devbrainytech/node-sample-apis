import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import User from './user';
import Role from '../../roles/models/role';
/**
 * UserRole Model
 * Represents user-role entity in the database with Sequelize ORM
 * @description This model represents the relationship between users and roles in the database.
 */

/**
 * Interface defining UserRole attributes
 * @description This interface defines the attributes of the UserRole model.
 */
interface UserRoleAttributes {
  id: number;
  user_id: number;
  role_id: number;
}

/**
 * UserRole Model Class
 * Extends Sequelize Model with UserRoleAttributes interface
 * @description This class represents the UserRole model in the database.
 * @extends Model<UserRoleAttributes>
 */
class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
  public id!: number;
  public user_id!: number;
  public role_id!: number;
}

/**
 * Initialize UserRole Model
 * @param sequelize Sequelize instance
 * @param DataTypes Sequelize DataTypes
 * @description Initializes UserRole Model with Sequelize
 * @returns UserRole Model
 */
UserRole.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'users_roles',
    timestamps: true,
    underscored: true,
  }
);

// Define associations
UserRole.belongsTo(User, { foreignKey: 'user_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });

export default UserRole;

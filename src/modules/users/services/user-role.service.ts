import UserRole from '../models/user-role';

class UserRoleService {
  private static instance: UserRoleService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): UserRoleService {
    if (!UserRoleService.instance) {
      UserRoleService.instance = new UserRoleService();
    }
    return UserRoleService.instance;
  }

  public async getUserRoleById(id: number): Promise<UserRole | null> {
    return await UserRole.findByPk(id);
  }

  public async getUserRolesByUserId(userId: number): Promise<UserRole[]> {
    return await UserRole.findAll({ where: { user_id: userId } });
  }

  public async createUserRole(userRoleData: Partial<UserRole>): Promise<UserRole> {
    if (userRoleData.user_id === undefined) {
      throw new Error('user_id is required');
    }
    return await UserRole.create(userRoleData as UserRole);
  }

  public async updateUserRole(
    id: number,
    userRoleData: Partial<UserRole>
  ): Promise<[number, UserRole[]]> {
    return await UserRole.update(userRoleData, {
      where: { id },
      returning: true,
    });
  }

  public async deleteUserRole(id: number): Promise<number> {
    return await UserRole.destroy({
      where: { id },
    });
  }
}

export default UserRoleService;

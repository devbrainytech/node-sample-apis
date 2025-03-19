import Role from '../models/role';

class RoleService {
  private static instance: RoleService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  public async getRoleById(id: number): Promise<Role | null> {
    return await Role.findByPk(id);
  }

  public async getAllRoles(): Promise<Role[]> {
    return await Role.findAll();
  }

  public async createRole(roleData: Partial<Role>): Promise<Role> {
    return await Role.create(roleData as Role);
  }

  public async updateRole(id: number, roleData: Partial<Role>): Promise<[number, Role[]]> {
    return await Role.update(roleData, {
      where: { id },
      returning: true,
    });
  }

  public async deleteRole(id: number): Promise<number> {
    return await Role.destroy({
      where: { id },
    });
  }
}

export default RoleService;

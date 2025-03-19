import User from '../models/user';

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  public async getUserById(userId: number): Promise<User | null> {
    return await User.findByPk(userId);
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.email) {
      throw new Error('Email is required');
    }
    const createData = userData as User;
    return await User.create(createData);
  }

  public async updateUser(userId: number, userData: Partial<User>): Promise<[number, User[]]> {
    return await User.update(userData, {
      where: { id: userId },
      returning: true,
    });
  }

  public async deleteUser(userId: number): Promise<number> {
    return await User.destroy({
      where: { id: userId },
    });
  }
}
export default UserService;

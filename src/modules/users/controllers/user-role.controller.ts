import { Request, Response } from 'express';
import UserRoleService from '../services/user-role.service';
import { HttpStatus } from '../../../utils/httpStatus';

const userRoleService = UserRoleService.getInstance();

export class UserRoleController {
  public async getUserRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userRole = await userRoleService.getUserRoleById(Number(id));
      if (!userRole) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'UserRole not found' });
      }
      return res.status(HttpStatus.OK).json(userRole);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching UserRole' });
    }
  }

  public async getUserRolesByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const userRoles = await userRoleService.getUserRolesByUserId(Number(userId));
      return res.status(HttpStatus.OK).json(userRoles);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching UserRoles' });
    }
  }

  public async createUserRole(req: Request, res: Response): Promise<Response> {
    try {
      const userRoleData = req.body;
      const newUserRole = await userRoleService.createUserRole(userRoleData);
      return res.status(HttpStatus.CREATED).json(newUserRole);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error creating UserRole' });
    }
  }

  public async updateUserRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userRoleData = req.body;
      const [updatedCount, updatedUserRoles] = await userRoleService.updateUserRole(
        Number(id),
        userRoleData
      );
      if (updatedCount === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'UserRole not found' });
      }
      return res.status(HttpStatus.OK).json(updatedUserRoles[0]);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error updating UserRole' });
    }
  }

  public async deleteUserRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedCount = await userRoleService.deleteUserRole(Number(id));
      if (deletedCount === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'UserRole not found' });
      }
      return res.status(HttpStatus.OK).json({ message: 'UserRole deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error deleting UserRole' });
    }
  }
}

import { Request, Response } from 'express';
import Role from '../models/role';

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

import express from 'express';
import sequelize from '../config/database';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.get('/', apiLimiter, async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'API is running and connected to the database.' });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to the database.', error });
  }
});

export default router;

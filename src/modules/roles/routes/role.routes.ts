import express from 'express';
import { getRoles } from '../controllers/role.controller';
import { apiLimiter } from '../../../middleware/rateLimiter';

const router = express.Router();

router.get('/', apiLimiter, getRoles);

export default router;

import express from 'express';
import healthCheck from './healthcheck';
import roleRoutes from '../modules/roles/routes/role.routes';
import authRoutes from '../modules/users/routes/auth.routes';
import productRoutes from '../modules/products/routes/product.routes';

const router = express.Router();

router.use('/healthcheck', healthCheck);
router.use('/roles', roleRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

export default router;

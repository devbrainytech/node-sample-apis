import { Router, Request, Response, RequestHandler } from 'express';
import { ProductController } from '../controllers/product.controller';
import { apiLimiter } from '../../../middleware/rateLimiter';
import { verifyToken } from '../../../middleware/auth.middleware';

const router = Router();
const productController = new ProductController();

const getProductById: RequestHandler = async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
};

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
};

const createProduct: RequestHandler = async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
};

const updateProduct: RequestHandler = async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
};

const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
};

router.get('/:id', apiLimiter, verifyToken, getProductById);
router.get('/', apiLimiter, verifyToken, getAllProducts);
router.post('/', apiLimiter, verifyToken, createProduct);
router.put('/:id', apiLimiter, verifyToken, updateProduct);
router.delete('/:id', apiLimiter, verifyToken, deleteProduct);

export default router;

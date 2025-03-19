import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { HttpStatus } from '../../../utils/httpStatus';

const productService = ProductService.getInstance();

export class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        sort = 'created_at',
        sortOrder = 'asc',
        status = '',
        categoryId = 0,
        type = '',
      } = req.query;
      const { rows, count } = await productService.getAllProducts(
        Number(page),
        Number(limit),
        String(search),
        String(sort),
        String(sortOrder),
        String(status),
        Number(categoryId),
        String(type)
      );
      return res.status(HttpStatus.OK).json({ products: rows, total: count });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching products' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(Number(id));
      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
      }
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching product' });
    }
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      return res.status(HttpStatus.CREATED).json(newProduct);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error creating product' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productData = req.body;
      const [updatedCount, updatedProducts] = await productService.updateProduct(
        Number(id),
        productData
      );
      if (updatedCount === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
      }
      return res.status(HttpStatus.OK).json(updatedProducts[0]);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error updating product' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedCount = await productService.deleteProduct(Number(id));
      if (deletedCount === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
      }
      return res.status(HttpStatus.OK).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error deleting product' });
    }
  }
}

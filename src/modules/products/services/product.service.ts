import { Op } from 'sequelize';
import Product from '../models/product';
import ProductCategory from '../models/product-category';

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public async getAllProducts(
    page: number,
    limit: number,
    search: string,
    sort: string,
    sortOrder: string,
    status: string,
    categoryId: number,
    type: string
  ): Promise<{ rows: Product[]; count: number }> {
    const offset = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (type) {
      whereClause.type = type;
    }

    const includeClause: any = [];
    if (categoryId) {
      includeClause.push({
        model: ProductCategory,
        where: { id: categoryId },
      });
    }

    const { rows, count } = await Product.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit,
      offset,
      order: [[sort, sortOrder]],
    });

    return { rows, count };
  }

  public async getProductById(id: number): Promise<Product | null> {
    return await Product.findByPk(id, {
      include: [ProductCategory],
    });
  }
  public async createProduct(productData: Partial<Product>): Promise<Product | undefined> {
    if (productData.status === undefined) {
      delete productData.status;
    }
    return await Product.create(productData as Product);
  }

  public async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<[number, Product[]]> {
    return await Product.update(productData, {
      where: { id },
      returning: true,
    });
  }

  public async deleteProduct(id: number): Promise<number> {
    return await Product.destroy({
      where: { id },
    });
  }
}

export default ProductService;

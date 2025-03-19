import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import Product from './product';

interface ProductSaleAttributes {
  id: number;
  product_id: number;
  sale_price: number;
  sale_start: Date;
  sale_end: Date | null;
  status: 'active' | 'draft';
  created_at: Date;
}

class ProductSale extends Model<ProductSaleAttributes> implements ProductSaleAttributes {
  public id!: number;
  public product_id!: number;
  public sale_price!: number;
  public sale_start!: Date;
  public sale_end!: Date | null;
  public status!: 'active' | 'draft';
  public created_at!: Date;
}

ProductSale.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sale_start: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    sale_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'draft'),
      allowNull: false,
      defaultValue: 'draft',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'product_sales',
    underscored: true,
    timestamps: false,
  }
);

Product.hasMany(ProductSale, { foreignKey: 'product_id' });
ProductSale.belongsTo(Product, { foreignKey: 'product_id' });

export default ProductSale;

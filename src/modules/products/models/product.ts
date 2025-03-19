import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  stock: number | null;
  stock_status: 'in_stock' | 'out_of_stock';
  status: 'publish' | 'draft' | 'private' | 'trash';
  description: string | null;
  short_description: string | null;
  type: 'product' | 'membership' | 'session';
  featured: boolean;
  is_global: boolean;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: Date;
  updated_at: Date;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public sku!: string | null;
  public price!: number;
  public stock!: number | null;
  public stock_status!: 'in_stock' | 'out_of_stock';
  public status!: 'publish' | 'draft' | 'private' | 'trash';
  public description!: string | null;
  public short_description!: string | null;
  public type!: 'product' | 'membership' | 'session';
  public featured!: boolean;
  public is_global!: boolean;
  public meta_title!: string | null;
  public meta_description!: string | null;
  public meta_keywords!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock_status: {
      type: DataTypes.ENUM('in_stock', 'out_of_stock'),
      allowNull: false,
      defaultValue: 'in_stock',
    },
    status: {
      type: DataTypes.ENUM('publish', 'draft', 'private', 'trash'),
      allowNull: false,
      defaultValue: 'draft',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('product', 'membership', 'session'),
      allowNull: false,
      defaultValue: 'product',
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_global: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    meta_keywords: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'products',
    underscored: true,
    timestamps: false,
  }
);

export default Product;

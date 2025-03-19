import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';

interface ProductCategoryAttributes {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: Date;
  updated_at: Date;
}

class ProductCategory
  extends Model<ProductCategoryAttributes>
  implements ProductCategoryAttributes
{
  public id!: number;
  public parent_id!: number | null;
  public name!: string;
  public slug!: string;
  public meta_title!: string | null;
  public meta_description!: string | null;
  public meta_keywords!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

ProductCategory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'product_categories',
    underscored: true,
    timestamps: false,
  }
);

export default ProductCategory;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import Product from './product';

interface ProductImageAttributes {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  is_default: boolean;
}

class ProductImage extends Model<ProductImageAttributes> implements ProductImageAttributes {
  public id!: number;
  public product_id!: number;
  public image_url!: string;
  public alt_text!: string | null;
  public is_default!: boolean;
}

ProductImage.init(
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
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    alt_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'product_images',
    underscored: true,
    timestamps: false,
  }
);

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

export default ProductImage;

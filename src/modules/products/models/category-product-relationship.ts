import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database';
import Product from './product';
import ProductCategory from './product-category';

interface CategoryProductRelationshipAttributes {
  product_id: number;
  category_id: number;
}

class CategoryProductRelationship
  extends Model<CategoryProductRelationshipAttributes>
  implements CategoryProductRelationshipAttributes
{
  public product_id!: number;
  public category_id!: number;
}

CategoryProductRelationship.init(
  {
    product_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'category_product_relationship',
    underscored: true,
    timestamps: false,
  }
);

Product.belongsToMany(ProductCategory, {
  through: CategoryProductRelationship,
  foreignKey: 'product_id',
});
ProductCategory.belongsToMany(Product, {
  through: CategoryProductRelationship,
  foreignKey: 'category_id',
});

export default CategoryProductRelationship;

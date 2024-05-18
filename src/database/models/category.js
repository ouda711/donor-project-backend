/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import slugify from 'slugify';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.belongsToMany(models.project, {
        through: models.projectCategory,
        foreignKey: 'categoryId', // This should match the foreign key in the join table
        otherKey: 'projectId', // This should match the foreign key in the join table
      });
    }
  }
  category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'category',
    hooks: {
      beforeValidate(instance, options) {
        // eslint-disable-next-line no-param-reassign
        instance.slug = slugify(instance.name, { lower: true });
      },
    },
  });

  return category;
};

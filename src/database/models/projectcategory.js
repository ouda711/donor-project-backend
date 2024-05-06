/* eslint-disable no-unused-vars */
const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class projectCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projectCategory.belongsTo(models.project, { foreignKey: 'projectId' });
      projectCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
    }
  }
  projectCategory.init({
    projectId: {
      type: DataTypes.UUID,
      field: 'projectId',
    },
    categoryId: {
      type: DataTypes.UUID,
      field: 'categoryId',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'createdAt',
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'projectCategory',
  });
  return projectCategory;
};

/* eslint-disable no-unused-vars */
const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      point.belongsToMany(models.project, {
        through: models.projectPoint,
        foreignKey: 'pointId',
        otherKey: 'projectId',
      });
    }
  }
  point.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'point',
  });
  return point;
};

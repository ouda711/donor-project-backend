const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class projectPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projectPoint.belongsTo(models.project, { foreignKey: 'projectId' });
      projectPoint.belongsTo(models.point, { foreignKey: 'pointId' });
    }
  }
  projectPoint.init({
    projectId: DataTypes.UUID,
    pointId: DataTypes.UUID,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'createdAt',
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'projectPoint',
  });
  return projectPoint;
};

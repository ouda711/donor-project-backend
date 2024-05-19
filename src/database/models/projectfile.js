/* eslint-disable no-unused-vars */

const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class projectFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projectFile.belongsTo(models.project, { foreignKey: 'projectId' });
    }
  }
  projectFile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fileName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    originalName: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    projectId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'projectFile',
  });
  return projectFile;
};

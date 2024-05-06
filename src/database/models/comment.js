/* eslint-disable no-unused-vars */

const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user, { foreignKey: 'userId' });
      comment.belongsTo(models.project, { foreignKey: 'projectId' });
    }
  }
  comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: DataTypes.STRING,
    projectId: DataTypes.UUID,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};

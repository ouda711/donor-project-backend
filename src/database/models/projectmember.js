const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class projectMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projectMember.belongsTo(models.project, { foreignKey: 'projectId' });
      projectMember.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  projectMember.init({
    projectId: DataTypes.UUID,
    userId: DataTypes.UUID,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'createdAt',
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'projectMember',
  });
  return projectMember;
};

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class userRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userRole.belongsTo(models.user, { foreignKey: 'userId' });
      userRole.belongsTo(models.role, { foreignKey: 'roleId' });
    }
  }
  userRole.init({
    roleId: {
      type: DataTypes.UUID,
      field: 'roleId',
    },
    userId: {
      type: DataTypes.UUID,
      field: 'userId',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'createdAt',
    },
  }, {
    sequelize,
    modelName: 'userRole',
    timestamps: false,
  });
  return userRole;
};

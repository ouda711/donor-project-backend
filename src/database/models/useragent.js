const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class userAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userAgent.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  userAgent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    ipAddress: DataTypes.STRING,
    browser: DataTypes.STRING,
    isBlocked: DataTypes.BOOLEAN,
    isSuspecious: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'userAgent',
  });
  return userAgent;
};

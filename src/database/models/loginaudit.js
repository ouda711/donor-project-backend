const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class loginAudit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  loginAudit.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    loginTime: DataTypes.DATE,
    remoteIp: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('success', 'failed'),
      defaultValue: 'failed',
    },
    provider: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    userAgent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'loginAudit',
  });
  return loginAudit;
};

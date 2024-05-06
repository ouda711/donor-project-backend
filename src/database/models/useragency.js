const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class userAgency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userAgency.belongsTo(models.user, { foreignKey: 'userId' });
      userAgency.belongsTo(models.agency, { foreignKey: 'agencyId' });
    }
  }
  userAgency.init({
    userId: DataTypes.UUID,
    agencyId: DataTypes.UUID,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'createdAt',
    },
  }, {
    sequelize,
    modelName: 'userAgency',
  });
  return userAgency;
};

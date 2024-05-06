/* eslint-disable no-unused-vars */
const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      agency.hasMany(models.project, { foreignKey: 'projectId' });
      agency.belongsToMany(models.user, {
        through: models.userAgency,
        foreignKey: 'agencyId',
        otherKey: 'userId',
      });
    }
  }
  agency.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    website: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    logoUrl: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    contactName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'agency',
  });
  return agency;
};

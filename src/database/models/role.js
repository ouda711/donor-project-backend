const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.belongsToMany(models.user, {
        through: models.userRole,
        foreignKey: 'roleId',
        otherKey: 'userId',
        as: 'users',
      });
    }
  }
  role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    objectState: {
      allowNull: false,
      type: DataTypes.ENUM('active', 'inactive', 'deleted'),
      defaultValue: 'active',
    },
    isUpdated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    deletedBy: {
      allowNull: true,
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};

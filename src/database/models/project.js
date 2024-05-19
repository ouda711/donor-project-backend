/* eslint-disable no-unused-vars */

const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // project.belongsToMany(models.user, {
      //   through: models.projectMember,
      //   foreignKey: 'projectId',
      //   otherKey: 'userId',
      // });
      project.hasMany(models.projectFile, { foreignKey: 'projectId' });
      project.hasMany(models.comment, { foreignKey: 'projectId' });
      // project.belongsToMany(models.user, {
      //   through: models.projectMember,
      //   foreignKey: 'projectId',
      //   otherKey: 'userId',
      // });
      project.belongsToMany(models.point, {
        through: models.projectPoint,
        foreignKey: 'projectId',
        otherKey: 'pointId',
      });
      project.belongsToMany(models.category, {
        through: models.projectCategory,
        foreignKey: 'projectId', // This should match the foreign key in the join table
        otherKey: 'categoryId', // This should match the foreign key in the join table
      });
      project.belongsTo(models.user, { foreignKey: 'createdBy' });
      project.belongsTo(models.agency, { foreignKey: 'agencyId' });
      // project.hasMany(models.projectUser, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.task, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.taskUser, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.taskComment, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.projectComment, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.projectFile, {
      //   foreignKey: 'projectId',
      // });
      // project.hasMany(models.projectAudit, {
      //   foreignKey: 'projectId',
      // });
    }
  }
  project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('upcoming', 'in-progress', 'complete', 'overdue', 'paused', 'discontinued'),
    color: DataTypes.STRING,
    visibility: DataTypes.ENUM('private', 'public', 'team'),
    dueDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    isFree: DataTypes.BOOLEAN,
    budget: DataTypes.DOUBLE,
    progress: DataTypes.DOUBLE,
    usedAmount: DataTypes.DOUBLE,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    createdBy: DataTypes.UUID,
    updatedBy: DataTypes.UUID,
    deletedBy: DataTypes.UUID,
    agencyId: DataTypes.UUID,
    projectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};

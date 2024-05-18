/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('upcoming', 'in-progress', 'complete', 'overdue', 'paused', 'discontinued'),
      },
      visibility: {
        type: Sequelize.ENUM('private', 'public', 'team'),
      },
      color: {
        type: Sequelize.STRING,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      isFree: {
        type: Sequelize.BOOLEAN,
      },
      budget: {
        type: Sequelize.DOUBLE,
      },
      progress: {
        type: Sequelize.DOUBLE,
      },
      usedAmount: {
        type: Sequelize.DOUBLE,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      createdBy: {
        type: Sequelize.UUID,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updatedBy: {
        type: Sequelize.UUID,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      deletedBy: {
        type: Sequelize.UUID,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      agencyId: {
        type: Sequelize.UUID,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'agencies',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      projectId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};

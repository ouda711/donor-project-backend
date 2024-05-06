/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projectMembers', {
      projectId: {
        type: Sequelize.UUID,
        reference: {
          model: 'projects',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      userId: {
        type: Sequelize.UUID,
        reference: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projectMembers');
  },
};

export const up = (queryInterface, Sequelize) => queryInterface.createTable('users', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING(30),
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING(30),
  },
  profilePicture: {
    allowNull: true,
    type: Sequelize.STRING(255),
  },
  otherName: {
    allowNull: true,
    type: Sequelize.STRING(30),
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING(50),
    unique: true,
  },
  phone: {
    allowNull: false,
    type: Sequelize.STRING(15),
    unique: true,
  },
  dateOfBirth: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  gender: {
    allowNull: true,
    type: Sequelize.ENUM('male', 'female', 'other'),
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  isEmailVerified: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isPhoneVerified: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  objectState: {
    allowNull: false,
    type: Sequelize.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'active',
  },
  isUpdated: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdBy: {
    allowNull: true,
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  updatedBy: {
    allowNull: true,
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  deletedBy: {
    allowNull: true,
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

export const down = (queryInterface) => queryInterface.dropTable('users');

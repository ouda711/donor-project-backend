import { compare, hash } from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

import { tokenHelper, mailHelper } from '@/helpers';

export default function (sequelize) {
  class User extends Model {
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    generateToken(expiresIn = '1h') {
      const data = { id: this.id, email: this.email, roles: this.roles.map((role) => role.name) };
      return tokenHelper.generateToken(data, expiresIn);
    }

    validatePassword(plainPassword) {
      return compare(plainPassword, this.password);
    }

    sendMail(mail) {
      const payload = { ...mail, to: `${this.fullName} <${this.email}>` };
      return mailHelper.sendMail(payload);
    }

    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // User.hasMany(models.tweet, { foreignKey: 'userId' });
      // eslint-disable-next-line no-unused-vars
      User.hasMany(models.userAgent, { foreignKey: 'userId' });
      User.belongsToMany(models.role, {
        through: models.userRole,
        foreignKey: 'userId',
        otherKey: 'roleId',
      });
      User.belongsToMany(models.project, {
        through: models.projectMember,
        foreignKey: 'userId',
        otherKey: 'projectId',
      });
      User.belongsToMany(models.agency, {
        through: models.userAgency,
        foreignKey: 'userId',
        otherKey: 'agencyId',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    otherName: {
      allowNull: true,
      type: DataTypes.STRING(30),
    },
    profilePicture: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(15),
      unique: true,
    },
    dateOfBirth: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    gender: {
      allowNull: true,
      type: DataTypes.ENUM('male', 'female', 'other'),
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEmailVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPhoneVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'user',
    sequelize,
  });

  User.addHook('beforeSave', async (instance) => {
    if (instance.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      instance.password = await hash(instance.password, 10);
    }
  });

  User.addHook('afterCreate', (instance) => {
    // Send welcome message to user.
    const payload = {
      subject: 'Welcome to Express Starter',
      html: 'Your account is created successfully!',
    };
    instance.sendMail(payload);
  });

  User.addHook('afterDestroy', (instance) => {
    // Send good by message to user.
    const payload = {
      subject: 'Sorry to see you go',
      html: 'Your account is destroyed successfully!',
    };
    instance.sendMail(payload);
  });

  User.addHook('afterCreate', (user) => {
    if (user.roles == null) {
      // eslint-disable-next-line consistent-return
      user.getRoles().then((roles) => {
        if (roles == null || roles.length === 0) {
          return sequelize.models.role.findOrCreate({
            where: { name: 'ROLE_TENANT' },
            defaults: { description: 'For all users who are looking to rent out available units' },
          }).then(async (role) => {
            // eslint-disable-next-line new-cap
            new sequelize.models.userRole({
              roleId: role[0].id,
              userId: user.id,
            }).save()
              .then(() => {
                console.log('attached to ROLE_TENANT');
              }).catch((err) => {
                throw err;
              });
          }).catch((err) => {
            throw err;
          });
        }
      });
    }
  });

  return User;
}

import { Sequelize } from 'sequelize';

import * as config from '@/config/sequelize';

// import models
import userModel from './models/user';
import userAgentModel from './models/useragent';
import rolesModel from './models/role';
import userRolesModel from './models/userrole';
import loginAuditModel from './models/loginaudit';
import agencyModel from './models/agency';
import categoryModel from './models/category';
import projectModel from './models/project';
import projectcategoryModel from './models/projectcategory';
import commentModel from './models/comment';
import projectfileModel from './models/projectfile';
import projectmemberMember from './models/projectmember';
import pointModel from './models/point';
import projectpointModel from './models/projectpoint';
import useragencyModel from './models/useragency';

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [
  userModel,
  userAgentModel,
  rolesModel,
  userRolesModel,
  loginAuditModel,
  agencyModel,
  categoryModel,
  projectModel,
  projectcategoryModel,
  commentModel,
  projectfileModel,
  projectmemberMember,
  pointModel,
  projectpointModel,
  useragencyModel,
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models)
  .forEach((modelName) => {
    if (sequelize.models[modelName].associate) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  });

export default sequelize;

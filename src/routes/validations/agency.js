import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const registerAgencyRules = [
  body('name').exists(),
  body('contactEmail').isEmail().exists(),
  body('contactPhone').exists(),
  body('contactName').exists(),
];

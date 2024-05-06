/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const categoryRules = [
  body('name').exists(),
  body('description').exists(),
];

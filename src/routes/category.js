import { Router } from 'express';

import * as categoryController from '@/controllers/category.controller';
import * as categoryValidations from '@/routes/validations/category';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/create',
  isAuthenticated, validate(categoryValidations.categoryRules), categoryController.createCategory);
router.put('/:id', isAuthenticated,
  validate(categoryValidations.categoryRules), categoryController.updateCategory);
router.delete('/:id', isAuthenticated, categoryController.deleteCategory);

export default router;

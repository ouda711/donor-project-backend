/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { isAuthenticated, validate } from '@/middleware';

import * as projectController from '@/controllers/project.controller';

const { setUploadPath } = require('@/middleware/upload.middleware');
const { upload } = require('@/utils/upload');

const router = Router();

require('./param-loaders/projects.loader').init(router);

router.get('/by_id/:projectId', projectController.getById);
router.get('/by_category/:categoryId', projectController.getByCategory);
router.get('/all', projectController.getAll);
router.post('/create',
  isAuthenticated,
  setUploadPath('./public/images/projects'), upload.array('images', 6), projectController.createProject);
router.get('/project-files/:projectId', projectController.getProjectFiles);
router.get('/chart-data', projectController.getChartData);

export default router;

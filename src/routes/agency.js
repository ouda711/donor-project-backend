/* eslint-disable no-unused-vars */
import { Router } from 'express';

import * as agencyController from '@/controllers/agency.controller';
import { isAuthenticated, validate } from '@/middleware';
import * as agencyValidations from '@/routes/validations/agency';

const { upload } = require('@/utils/upload');
const { setUploadPath } = require('@/middleware/upload.middleware');

const router = Router();

router.post('/create',
  setUploadPath('./public/images/agency'), upload.array('logo', 1), agencyController.createAgency);

router.get('/all', agencyController.getAllAgencies);

export default router;

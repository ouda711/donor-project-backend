/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { isAuthenticated, validate } from '@/middleware';
import * as commentsController from '@/controllers/comments.controller';

const router = Router();

require('./param-loaders/projects.loader').init(router);
require('./param-loaders/comments.loader').init(router);

router.get('/projects/:product_load_ids/comments', isAuthenticated, commentsController.getCommentsFromProject);
router.get('/projects/by_id/:product_load_ids/comments', isAuthenticated, commentsController.getCommentsFromProject);
router.get('/comments/:comment', isAuthenticated, commentsController.getCommentDetails);

router.post('/projects/:projectId/comments', isAuthenticated, commentsController.createComment);
router.delete('/projects/:skip/comments/:comment_load_ids', isAuthenticated, commentsController.deleteComment);
router.delete('/comments/:comment_load_ids', isAuthenticated, commentsController.deleteComment);

export default router;

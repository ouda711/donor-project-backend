import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import categoryRouter from '@/routes/category';
import projectRouter from '@/routes/project';
import commentRouter from '@/routes/comment';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/category', categoryRouter);
  app.use('/api/v1/projects', projectRouter);
  app.use('/api/v1/comment', commentRouter);
}

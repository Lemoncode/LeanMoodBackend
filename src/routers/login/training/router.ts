import { Router } from 'express';

export const trainingRouter = Router();

trainingRouter.use('/:trainingId', (req, res, next) => {
  console.log('middleware');
  next();
});

trainingRouter.route('/:trainingId/author/:authorId')
.get((req, res) => {
  console.log('main response');
  res.send('/training/:trainingId/author/:authorId');
});


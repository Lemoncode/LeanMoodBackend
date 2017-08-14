import { Router } from 'express';

export const trainingRouter = Router();

trainingRouter.use('/:trainingId', (req, res, next) => {
  next();
});

trainingRouter.route('/:trainingId/author/:authorId')
.get((req, res) => {
  res.send('/training/:trainingId/author/:authorId');
});

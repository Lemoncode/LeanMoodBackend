import { Router } from 'express';
import { TrainingsController } from './controller';
import { Training } from '../../../models';

export const trainingsRouter = () => {
  const router = Router();
  const trainingsController = TrainingsController(Training);

  router.route('/:id')
    .get(trainingsController.getById);

  return router;
};

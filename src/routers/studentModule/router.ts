import { Router } from 'express';
import { studentsRouter } from './students';
import { trainingsRouter } from './trainings';

export const studentModuleRouter = () => {
  const router = Router();
  router.use('/students', studentsRouter());
  router.use('/trainings', trainingsRouter());

  return router;
};

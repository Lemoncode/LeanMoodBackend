import { Router } from 'express';
import { StudentsController } from './controller';
import { Student } from '../../../models';

export const studentsRouter = () => {
  const router = Router();
  const studentsController = StudentsController(Student);

  router.route('/')
    .get(studentsController.get);

  return router;
};

import { Router } from 'express';
import { LoginController } from './controller';
import { User } from '../../models';

export const loginRouter = () => {
  const router = Router();
  const logincontroller = LoginController(User);
  router.route('/')
    .post(logincontroller.post);

  return router;
};

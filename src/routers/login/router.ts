import { Router } from 'express';
import { LoginController } from './controller';
import { Login, User } from '../../models';

export const loginRouter = () => {
  const router = Router();
  const logincontroller = LoginController(Login, User);
  router.route('/')
    .post(logincontroller.post);

  return router;
};

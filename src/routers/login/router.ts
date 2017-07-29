import { Router } from 'express';
import * as mongoose from 'mongoose';
import { LoginController } from './controller';
import { Login } from '../../models';

export const loginRouter = () => {
  const router = Router();
  const logincontroller = LoginController(Login);
  router.route('/')
    .post(logincontroller.post)
    .get(logincontroller.get);

  return router;
}

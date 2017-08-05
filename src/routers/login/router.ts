import { Router } from 'express';
import * as mongoose from 'mongoose';
import { LoginController } from './controller';
import { Login, User } from '../../models';

export const loginRouter = () => {
  const router = Router();
  const logincontroller = LoginController(Login, User);
  router.route('/')
    .post(logincontroller.post);

  return router;
}

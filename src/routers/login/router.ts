import { Router } from 'express';
import * as mongoose from 'mongoose';
import { LoginController } from './controller';
import { User } from '../../models';

export const loginRouter = () => {
  const router = Router();
  const logincontroller = LoginController(User);
  router.route('/')
    .post(logincontroller.post)
    .get(logincontroller.get);

  return router;
}

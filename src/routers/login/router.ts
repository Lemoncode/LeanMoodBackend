import { Router } from 'express';
import { LoginController } from './controller';

export const loginRouter = Router();
const logincontroller = LoginController();

loginRouter.route('/')
.post(logincontroller.post);



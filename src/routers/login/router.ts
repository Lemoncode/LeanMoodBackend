import { Router } from 'express';
import {trainingRouter} from './training/router';

export const loginRouter = Router();
loginRouter.use('/training', trainingRouter);

loginRouter.route('/')
  //TODO: Replace by POST
  .get((req, res) => {
    res.send('Login success!');
  });



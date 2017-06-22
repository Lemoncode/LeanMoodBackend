import { Router } from 'express';

export const loginRouter = Router();

loginRouter.route('/')
  //TODO: Replace by POST
  .get((req, res) => {
    res.send('Login success!');
  });

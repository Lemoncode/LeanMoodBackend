import { Router } from 'express';

export const loginRouter = Router();

loginRouter.route('/login')
  //TODO: Replace by POST
  .get((req, res) => {
    res.send('Login sucessful!');
  });

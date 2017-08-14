import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { LoginModel } from '../../models/Login';
import { UserModel } from '../../models/User';

export const LoginController = (Login: Model<LoginModel>, User: Model<UserModel>) => {
  const handlerPost = (req: Request, res: Response) => (result: LoginModel) => {
    (result.password === req.body.password) ?
      accessGrant(res, result) :
      accessDenied(res);
  };

  const accessGrant = (res: Response, loginModel: LoginModel) => {
    User.findOne({ email: loginModel.email })
      .exec()
      .then(handleUserRequest(res))
      .catch(() => res.sendStatus(400));
  };

  const handleUserRequest = (res: Response) => (userModel: UserModel) => {
    res.status(201)
      .send(userModel);
  };

  const accessDenied = (res: Response) => {
    res.sendStatus(401);
  };

  const post = (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
      Login.findOne({ email: req.body.email })
        .exec()
        .then(handlerPost(req, res))
        .catch(() => res.sendStatus(401));
    } else {
      res.status(400);
      res.send('email and password are required');
    }
  };

  return {
    post,
  };
};

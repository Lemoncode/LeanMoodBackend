import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { LoginModel } from '../../models/Login';
import { UserModel } from '../../models/User';
import { randomString, generateCookie } from 'security';
import { env } from '../../env.config';

export const LoginController = (Login: Model<LoginModel>, User: Model<UserModel>) => {
  const handlerPost = (req: Request, res: Response) => (result: LoginModel) => {
    (result.password === req.body.password) ?
      accessGrant(res, result) :
      accessDenied(res);
  };

  const accessGrant = (res: Response, loginModel: LoginModel) => {
    const securityToken = randomString(18);
    generateCookie(res, env.ACCESS_TOKEN_HEADER, securityToken);
    res.sendStatus(201);
    // User.findOne({ email: loginModel.email })
    //   .exec()
    //   .then(handleUserRequest(res))
    //   .catch(() => res.sendStatus(400));
  };

  // const handleUserRequest = (res: Response) => (userModel: UserModel) => {
  //   const securityToken = randomString(18);
  //   generateCookie(res, env.ACCESS_TOKEN_HEADER, securityToken);
  //   res.status(201)
  //     .send(securityToken);
  // };

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

  const get = (req: Request, res: Response) => {
    res.send(req.cookies[env.ACCESS_TOKEN_HEADER]);
  };

  return {
    post,
    get,
  };
};

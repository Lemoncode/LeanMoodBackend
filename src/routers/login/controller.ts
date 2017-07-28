import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { UserModel } from '../../models/User';

export const LoginController = (User: Model<UserModel>) => {
  const handlerPost = (req: Request, res: Response) => (result: UserModel) => {
    const message: string = (result.password === req.body.password) ?
      accessGrant(res) :
      accessDenied(res);
    res.send(message);
  };

  const accessGrant = (res: Response): string => {
    res.status(201);
    return 'granted access';
  };

  const accessDenied = (res: Response): string => {
    res.status(403);
    return 'denied access';
  };

  const post = (req: Request, res: Response) => {
    if (req.body.loginName && req.body.password) {
      User.findOne({ loginName: req.body.loginName })
        .exec()
        .then(handlerPost(req, res))
        .catch((err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
          res.sendStatus(401);
        });
    } else {
      res.status(400);
      res.send('loginName and password are required');
    }
  };

  return {
    post,
  };
};

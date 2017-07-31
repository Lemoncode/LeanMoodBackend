import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { LoginModel } from "../../models/Login";

export const LoginController = (Login: Model<LoginModel>) => {
  const handlerPost = (req: Request, res: Response) => (result: LoginModel) => {
    const message: string = (result.password === req.body.password) ?
      accessGrant(res)
      :
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
  }

  const post = (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
      Login.findOne({'email': req.body.email })
        .exec()
        .then(handlerPost(req, res))
        .catch(err => {
          console.log(err);
          res.sendStatus(401);
        });
    } else {
      res.status(400);
      res.send('email and password are required');
    }
  };

  return {
    post
  }
};

import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUserModel } from "../../models/User";

export const LoginController = (User: Model<IUserModel>) => { 
    const post = (req: Request, res: Response) => {
        if (req.body.loginName && req.body.password) {
            // if (User) {
            //     const user = new User(req.body);
            //     user.save().then(result => console.log(result));
            //     res.send(user);
            // }
            //TODO: Use this method to generate mongo seed.
        } else {
            res.status(400);
        }
    };

    // TODO: Remove this method.
    const get = (req: Request, res: Response) => {
        res.send('Login');
    }

    return {
        post,
        get
    }
};
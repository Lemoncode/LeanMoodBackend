import { Router } from 'express';
import { LoginController } from './controller'; 
import { Model } from 'mongoose';
import { IUserModel } from '../../models/User';

const router = Router();

export const loginRouter = (User: Model<IUserModel>) => {

    const logincontroller = LoginController(User);
    router.route('/')
        .post(logincontroller.post)
        .get(logincontroller.get);
    
    return router;
}

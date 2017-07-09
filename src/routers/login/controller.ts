import { Request, Response } from 'express';

// TODO: Pass dependency with model // moongoose model
export const LoginController = () => { 
    const post = (req: Request, res: Response) => {
        if (req.body.loginName && req.body.password) {
            // TODO: Use validation service. Return 403 if not ok.
            res.status(201); // Check out the right code.
            res.send({
                loginName: req.body.loginName,
                password: req.body.password,
            });
            //TODO: Use this method to generate mongo seed.
            
        } else {
            res.status(400);
        }
    };

    return {
        post
    }
};
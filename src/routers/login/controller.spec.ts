import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginController } from './controller';
import { Model } from 'mongoose';
import { IUserModel, IUser } from "../../models/User";
import { Request, Response } from 'express';

describe('LoginController test', () => {
    describe('post', () => {
        it('should not allowed empty loginName', () => {
            // Arrange
            const User: Model<IUserModel> = <Model<IUserModel>><any>(function() {});
            const req: Request = <Request><any>(
                {
                    body: {
                        password: 'test'
                    }
                }
            );
            const res: Response = <Response><any>({
                status: sinon.spy(),
                send: sinon.spy()
            });
            const loginController = LoginController(User);

            // Act
            loginController.post(req, res)
            
            // Assert 
            const spyResStatus = <sinon.SinonSpy>res.status;
            const spyResSend = <sinon.SinonSpy>res.send;
            expect(spyResStatus.calledWith(400)).to.be.true;  
            expect(spyResSend.calledWith('loginName and password are required')).to.be.true;
        });

        it('should not allowed empty password', () => {
            // Arrange
            const User: Model<IUserModel> = <Model<IUserModel>><any>(function() {});
            const req: Request = <Request><any>(
                {
                    body: {
                        loginName: 'jai'
                    }
                }
            );
            const res: Response = <Response><any>({
                status: sinon.spy(),
                send: sinon.spy()
            });
            const loginController = LoginController(User);

            // Act
            loginController.post(req, res)
            
            // Assert 
            const spyResStatus = <sinon.SinonSpy>res.status;
            const spyResSend = <sinon.SinonSpy>res.send;
            expect(spyResStatus.calledWith(400)).to.be.true;  
            expect(spyResSend.calledWith('loginName and password are required')).to.be.true;
        });
    });
});

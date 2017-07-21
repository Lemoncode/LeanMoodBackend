import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginController } from './controller';
import { Model } from 'mongoose';
import { UserModel } from "../../models/User";
import { Request, Response } from 'express';
import * as models from '../../models';

describe('LoginController test', () => {
  var UserMock = function () { };
  beforeEach(() => {
    UserMock.prototype.findOne = function () {
      return this;
    };
    UserMock.prototype.exec = function () {
      return this;
    };
    UserMock.prototype.then = function () {
      return this;
    };

    UserMock.prototype.catch = function () {
      return this;
    };
  });

  describe('post', () => {
    it('should not allowed empty loginName', () => {
      // Arrange
      const User: Model<UserModel> = <Model<UserModel>><any>(function () { });
      const req: Request = <Request><any>(
        {
          body: {
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
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
      const User: Model<UserModel> = <Model<UserModel>><any>(function () { });
      const req: Request = <Request><any>(
        {
          body: {
            loginName: 'jai',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
      });
      const loginController = LoginController(User);

      // Act
      loginController.post(req, res);

      // Assert
      const spyResStatus = <sinon.SinonSpy>res.status;
      const spyResSend = <sinon.SinonSpy>res.send;
      expect(spyResStatus.calledWith(400)).to.be.true;
      expect(spyResSend.calledWith('loginName and password are required')).to.be.true;
    });

    it('should return granted access when users exists and password matches', () => {
      // Arrange
      const req: Request = <Request><any>(
        {
          body: {
            loginName: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
      });

      UserMock.prototype.then = function (callback) {
        callback({ password: 'test' });
        return this;
      };

      const loginController = LoginController(<Model<UserModel>><any>(new UserMock()));

      // Act
      loginController.post(req, res);

      // Assert
      const spyResStatus = <sinon.SinonSpy>res.status;
      const spyResSend = <sinon.SinonSpy>res.send;
      expect(spyResStatus.calledWith(201)).to.be.true;
      expect(spyResSend.calledWith('granted access')).to.be.true;
    });

    it('should return denied access when users exists and password does not match', () => {
      // Arrange
      const req: Request = <Request><any>(
        {
          body: {
            loginName: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
      });

      UserMock.prototype.then = function (callback) {
        callback({ password: 'what ever' });
        return this;
      };

      const loginController = LoginController(<Model<UserModel>><any>(new UserMock()));

      // Act
      loginController.post(req, res);

      // Assert
      const spyResStatus = <sinon.SinonSpy>res.status;
      const spyResSend = <sinon.SinonSpy>res.send;
      expect(spyResStatus.calledWith(403)).to.be.true;
      expect(spyResSend.calledWith('denied access')).to.be.true;
    });
  });
});

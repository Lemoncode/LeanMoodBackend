import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginController } from './controller';
import { Model } from 'mongoose';
import { LoginModel } from "../../models/Login";
import { Request, Response } from 'express';
import * as models from '../../models';

describe('LoginController test', () => {
  var LoginMock = function () { };
  beforeEach(() => {
    LoginMock.prototype.findOne = function () {
      return this;
    };
    LoginMock.prototype.exec = function () {
      return this;
    };
    LoginMock.prototype.then = function () {
      return this;
    };
    LoginMock.prototype.catch = function () {
      return this;
    };
  });

  describe('post', () => {
    it('should not allowed empty email', () => {
      // Arrange
      const Login: Model<LoginModel> = <Model<LoginModel>><any>(function () { });
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
      const loginController = LoginController(Login);

      // Act
      loginController.post(req, res)

      // Assert
      const spyResStatus = <sinon.SinonSpy>res.status;
      const spyResSend = <sinon.SinonSpy>res.send;
      expect(spyResStatus.calledWith(400)).to.be.true;
      expect(spyResSend.calledWith('email and password are required')).to.be.true;
    });

    it('should not allowed empty password', () => {
      // Arrange
      const User: Model<LoginModel> = <Model<LoginModel>><any>(function () { });
      const req: Request = <Request><any>(
        {
          body: {
            email: 'jai',
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
      expect(spyResSend.calledWith('email and password are required')).to.be.true;
    });

    it('should return granted access when users exists and password matches', () => {
      // Arrange
      const req: Request = <Request><any>(
        {
          body: {
            email: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
      });

      LoginMock.prototype.then = function (callback) {
        callback({ password: 'test' });
        return this;
      };

      const loginController = LoginController(<Model<LoginModel>><any>(new LoginMock()));

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
            email: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(),
        send: sinon.spy(),
      });

      LoginMock.prototype.then = function (callback) {
        callback({ password: 'what ever' });
        return this;
      };

      const loginController = LoginController(<Model<LoginModel>><any>(new LoginMock()));

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

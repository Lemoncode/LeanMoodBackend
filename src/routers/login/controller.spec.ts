import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginController } from './controller';
import { Model } from 'mongoose';
import { LoginModel } from "../../models/Login";
import { UserModel } from "../../models/user";
import { Request, Response } from 'express';
import * as models from '../../models';

describe('LoginController test', () => {
  const LoginMock = function() { };
  const UserMock = function() { };

  beforeEach(() => {
    LoginMock.prototype.findOne = function() {
      return this;
    };
    LoginMock.prototype.exec = function() {
      return this;
    };
    LoginMock.prototype.then = function() {
      return this;
    };
    LoginMock.prototype.catch = function() {
      return this;
    };
    UserMock.prototype.findOne = function() {
      return this;
    };
    UserMock.prototype.exec = function() {
      return this;
    };
    UserMock.prototype.then = function() {
      return this;
    };
    UserMock.prototype.catch = function() {
      return this;
    };
  });

  describe('post', () => {
    it('should not allowed empty email', () => {
      // Arrange
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
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
      const loginController = LoginController(Login, User);

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
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
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
      const loginController = LoginController(Login, User);

      // Act
      loginController.post(req, res);

      // Assert
      const spyResStatus = <sinon.SinonSpy>res.status;
      const spyResSend = <sinon.SinonSpy>res.send;
      expect(spyResStatus.calledWith(400)).to.be.true;
      expect(spyResSend.calledWith('email and password are required')).to.be.true;
    });

    it('should return 400 when login success and password matches but user not found', () => {
      // Arrange
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
      const req: Request = <Request><any>(
        {
          body: {
            email: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(function() { return this }),
        send: sinon.spy(function() { return this }),
        sendStatus: sinon.spy(function() { return this }),
      });

      LoginMock.prototype.then = function(callback) {
        callback({ password: req.body.password });
        return this;
      };

      UserMock.prototype.catch = function(callback) {
        callback();
        return this;
      };

      const loginController = LoginController(Login, User);

      // Act
      loginController.post(req, res);

      // Assert
      const sendStatusSpy = <sinon.SinonSpy>res.sendStatus;
      expect(sendStatusSpy.calledWith(400)).to.be.true;
    });

    it('should return 201 and user when login success and password matches and get user successfully', () => {
      // Arrange
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
      const req: Request = <Request><any>(
        {
          body: {
            email: 'test email',
            password: 'test password',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(function() { return this }),
        send: sinon.spy(function() { return this }),
        sendStatus: sinon.spy(function() { return this }),
      });

      LoginMock.prototype.then = function(callback) {
        callback({ password: req.body.password });
        return this;
      };

      const expectedUser: Partial<UserModel> = {
        email: 'test email',
        role: 'test role'
      };

      UserMock.prototype.then = function(callback) {
        callback(expectedUser);
        return this;
      };

      const loginController = LoginController(Login, User);

      // Act
      loginController.post(req, res);

      // Assert
      const statusSpy = <sinon.SinonSpy>res.status;
      const sendSpy = <sinon.SinonSpy>res.send;
      expect(statusSpy.calledWith(201)).to.be.true;
      expect(sendSpy.calledWith(expectedUser)).to.be.true;
    });

    it('should return denied access when users exists and password does not match', () => {
      // Arrange
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
      const req: Request = <Request><any>(
        {
          body: {
            email: 'jai',
            password: 'test',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(function() { return this }),
        send: sinon.spy(function() { return this }),
        sendStatus: sinon.spy(function() { return this }),
      });

      LoginMock.prototype.then = function(callback) {
        callback({ password: 'what ever' });
        return this;
      };

      const loginController = LoginController(Login, User);

      // Act
      loginController.post(req, res);

      // Assert
      const sendStatusSpy = <sinon.SinonSpy>res.sendStatus;
      expect(sendStatusSpy.calledWith(401)).to.be.true;
    });

    it('should return 401 when login fail because email not found or bad request', () => {
      // Arrange
      const Login: Model<LoginModel> = new LoginMock();
      const User: Model<UserModel> = new UserMock();
      const req: Request = <Request><any>(
        {
          body: {
            email: 'wrong email',
            password: 'test password',
          }
        }
      );
      const res: Response = <Response><any>({
        status: sinon.spy(function() { return this }),
        send: sinon.spy(function() { return this }),
        sendStatus: sinon.spy(function() { return this }),
      });

      LoginMock.prototype.catch = function(callback) {
        callback();
        return this;
      };

      const loginController = LoginController(Login, User);

      // Act
      loginController.post(req, res);

      // Assert
      const sendStatusSpy = <sinon.SinonSpy>res.sendStatus;
      expect(sendStatusSpy.calledWith(401)).to.be.true;
    });
  });
});

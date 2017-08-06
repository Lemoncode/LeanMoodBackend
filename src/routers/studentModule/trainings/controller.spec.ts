import { expect } from 'chai';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { TrainingModel } from '../../../models/studentModule';
import { TrainingsController } from './controller';

describe('TrainingsController', () => {
  const TrainingMock = function() { };

  beforeEach(() => {
    TrainingMock.prototype.findById = function() {
      return this;
    };
    TrainingMock.prototype.exec = function() {
      return this;
    };
    TrainingMock.prototype.then = function() {
      return this;
    };
    TrainingMock.prototype.catch = function() {
      return this;
    };
  });
  describe('url: "/trainings/:id" method: "get"', () => {
    it('should return a 200 and training object when find training succes', () => {
      // Arrange
      const Training: Model<TrainingModel> = new TrainingMock();

      const trainingsController = TrainingsController(Training);

      const req: Request = <Request><any>{
        params: {
          id: 'test id',
        },
      };
      const res: Response = <Response><any>{
        send: sinon.spy(function() { return this; }),
        status: sinon.spy(function() { return this; }),
      };

      const expectedTraining: Partial<TrainingModel> = {
        id: req.params.id,
        name: 'test name',
        markdownContent: 'test markdownContent',
        files: [],
      };

      TrainingMock.prototype.then = function(callback) {
        callback(expectedTraining);
        return this;
      };

      // Act
      trainingsController.getById(req, res);

      // Assert
      const statusSpy = <sinon.SinonSpy>res.status;
      const sendSpy = <sinon.SinonSpy>res.send;
      expect(statusSpy.calledWith(200)).to.be.true;
      expect(sendSpy.calledWith(expectedTraining)).to.be.true;
    });

    it('should return a 400 when find training fail', () => {
      // Arrange
      const Training: Model<TrainingModel> = new TrainingMock();

      const trainingsController = TrainingsController(Training);

      const req: Request = <Request><any>{
        params: {
          id: 'wrong id',
        },
      };
      const res: Response = <Response><any>{
        sendStatus: sinon.spy(function() { return this; }),
      };

      const expectedTraining: Partial<TrainingModel> = {
        id: req.params.id,
        name: 'test name',
        markdownContent: 'test markdownContent',
        files: [],
      };

      TrainingMock.prototype.catch = function(callback) {
        callback();
        return this;
      };

      // Act
      trainingsController.getById(req, res);

      // Assert
      const sendStatusSpy = <sinon.SinonSpy>res.sendStatus;
      expect(sendStatusSpy.calledWith(400)).to.be.true;
    });
  });
});

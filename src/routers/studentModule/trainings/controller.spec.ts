import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { TrainingModel } from '../../../models/studentModule';
import { TrainingsController } from './controller';

// tslint:disable:no-unused-expression
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
    it('should return a training object', () => {
      // Arrange
      const trainingModel: TrainingModel = {
        name: 'test name',
        markdownContent: 'test markdownContent',
        files: [],
      };

      const TrainingMock = {
        getTrainingById: sinon.spy(function(trainingId: string) {
          return trainingModel;
        }),
      };
      const trainingsController = TrainingsController(TrainingMock);

      const req: Request = <Request><any>{
        params: {
          id,
        },
      };
      const res: Response = <Response><any>{
        send: sinon.spy(function() { return this; }),
        status: sinon.spy(function() { return this; }),
      };

      // Act
      trainingsController.getById(req, res);

      // Assert
      const resStatusSpy = <sinon.SinonSpy>res.status;
      const resSendSpy = <sinon.SinonSpy>res.send;
      expect(resSendSpy.calledWith(trainingModel)).to.be.true;
      expect(resStatusSpy.calledWith(200)).to.be.true;
      expect(TrainingMock.getTrainingById.calledWith(id)).to.be.true;
    });
  });
});

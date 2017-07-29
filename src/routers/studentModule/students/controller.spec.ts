import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { StudentModel } from '../../../models/studentModule';
import { StudentsController } from './controller';

// tslint:disable:no-unused-expression
describe('StudentsController', () => {
  describe('url: "/students/" method: "get"', () => {
    it('should return a student array', () => {
      // Arrange
      const students: StudentModel[] = [
        {
          id: '20',
          email: 'test email',
          fullname: 'test fullname',
          phoneNumber: 'test phoneNumber',
          isActive: false,
        },
      ];

      const StudentMock = {
        getMockStudents: sinon.spy(function() {
          return students;
        }),
      };
      const studentsController = StudentsController(StudentMock);

      const req: Request = <Request><any>{};
      const res: Response = <Response><any>{
        send: sinon.spy(function() { return this; }),
        status: sinon.spy(function() { return this; }),
      };

      // Act
      studentsController.get(req, res);

      // Assert
      const resStatusSpy = <sinon.SinonSpy>res.status;
      const resSendSpy = <sinon.SinonSpy>res.send;
      expect(resSendSpy.calledWith(students)).to.be.true;
      expect(resStatusSpy.calledWith(200)).to.be.true;
      expect(StudentMock.getMockStudents.called).to.be.true;
    });
  });
});

import { Request, Response } from 'express';
import { StudentModel } from '../../../models/studentModule';

export const StudentsController = (Student: StudentModel) => {
  const get = (req: Request, res: Response) => {
    const students: StudentModel[] = [
      {
        id: '34',
        email: 'testEmail@lemoncode.net',
        fullname: 'Test Name',
        isActive: true,
        phoneNumber: '123456',
      },
    ];

    res.send(students).status(200);
  };

  return {
    get,
  };
};

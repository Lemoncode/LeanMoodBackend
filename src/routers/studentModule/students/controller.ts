import { Request, Response } from 'express';

export const StudentsController = (Student) => {
  const get = (req: Request, res: Response) => {
    res
      .send(Student.getMockStudents())
      .status(200);
  };

  return {
    get,
  };
};

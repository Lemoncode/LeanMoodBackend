import { Request, Response } from 'express';

export const TrainingsController = (Training) => {
  const getById = (req: Request, res: Response) => {
    res
      .send(Training.getTrainingById(req.params.id))
      .status(200);
  };

  return {
    getById,
  };
};

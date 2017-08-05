import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { TrainingModel } from '../../../models/studentModule/Training';

export const TrainingsController = (Training: Model<TrainingModel>) => {
  const getById = (req: Request, res: Response) => {
    Training.findById(req.params.id)
      .exec()
      .then(handleGetById(res));
  };

  return {
    getById,
  };
};

const handleGetById = (res: Response) => (training: TrainingModel) => (
  res
    .status(200)
    .send(training)
);

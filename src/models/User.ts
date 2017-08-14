import * as mongoose from 'mongoose';
import { TrainingModel, trainingSchema } from './Training';

export interface UserModel extends mongoose.Document {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
  role: string;
  trainings: UserTraining[];
}

interface UserTraining {
  role: string;
  trainingId: string;
}

export const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  lastName: String,
  avatar: String,
  role: String,
  trainings: [
    {
      role: String,
      trainingId: String,
    },
  ],
});

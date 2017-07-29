import * as mongoose from 'mongoose';
import { TrainingModel, trainingSchema } from './Training';

export interface UserModel extends mongoose.Document {
  email: string,
  trainings: TrainingModel[],
}

export const userSchema = new mongoose.Schema({
  email: String,
  trainings: [trainingSchema],
});

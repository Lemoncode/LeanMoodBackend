import * as mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
  // TODO: Add type string[] when front-end implement role dashboard
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

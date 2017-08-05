import { connection, connectionAccess } from '../dbs';
import { LoginModel, loginSchema } from './Login';
import { UserModel, userSchema } from './User';

import { Model } from 'mongoose';
import { getMockStudents, TrainingModel, trainingSchema } from './studentModule';

export const Login: Model<LoginModel> = connectionAccess.model<LoginModel>('Login', loginSchema);
export const User: Model<UserModel> = connection.model<UserModel>('User', userSchema);
export const Training: Model<TrainingModel> = connection.model<TrainingModel>('Training', trainingSchema);
export const Student = {
  getMockStudents,
};

import connection from '../dbs';
import { UserModel, userSchema } from './User';
import { Model } from 'mongoose';
import { getMockStudents, getTrainingById } from './studentModule';

export const User: Model<UserModel> = connection.model<UserModel>('User', userSchema);

export const Student = {
  getMockStudents,
};
export const Training = {
  getTrainingById,
};

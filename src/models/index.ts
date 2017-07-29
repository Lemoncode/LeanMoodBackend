import connection from '../dbs';
import { UserModel, userSchema } from './User';
import { Model } from 'mongoose';
import { createEmptyStudent, createEmptyTraining } from './studentModule';

export const User: Model<UserModel> = connection.model<UserModel>('User', userSchema);

export const Student = createEmptyStudent();
export const Training = createEmptyTraining();

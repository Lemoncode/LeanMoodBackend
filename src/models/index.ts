import connection from '../dbs';
import { IUserModel, userSchema } from './User';
import { Model } from 'mongoose';

export const User: Model<IUserModel> = connection.model<IUserModel>('User', userSchema);

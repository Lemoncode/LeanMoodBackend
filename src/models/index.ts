import connection from '../dbs';
import { UserModel, userSchema } from './User';
import { Model } from 'mongoose';

export const User: Model<UserModel> = connection.model<UserModel>('User', userSchema);

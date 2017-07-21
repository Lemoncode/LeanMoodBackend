import * as mongoose from 'mongoose';

export interface IUser {
  loginName: string,
  password: string
}

export interface IUserModel extends IUser, mongoose.Document { }

export const userSchema = new mongoose.Schema({
  loginName: String,
  password: String
});

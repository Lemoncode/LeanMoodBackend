import * as mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  loginName: string;
  password: string;
}

export const userSchema = new mongoose.Schema({
  loginName: String,
  password: String,
});

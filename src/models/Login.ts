import * as mongoose from 'mongoose';
// TODO: Move to security schema.
export interface LoginModel extends mongoose.Document {
  email: string,
  password: string,
}

export const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

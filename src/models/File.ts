import * as mongoose from 'mongoose';

export interface FileModel extends mongoose.Document {
  name: string;
  size: number;
}

export const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
});

import * as mongoose from 'mongoose';
import { FileModel, fileSchema } from './File';

export interface TrainingModel extends mongoose.Document {
  name: string;
  markdownContent: string;
  files: FileModel[];
}

export const trainingSchema = new mongoose.Schema({
  name: String,
  markdownContent: String,
  files: [fileSchema],
});

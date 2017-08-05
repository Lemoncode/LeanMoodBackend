import * as mongoose from 'mongoose';
import { env } from '../env.config';

(<any>mongoose).Promise = Promise;

export const connection : mongoose.Connection = mongoose
  .createConnection(
    env.MONGODB_CONNECTION,
    { server: { poolSize: 5 }},
  );

export const connectionAccess : mongoose.Connection = mongoose.
  createConnection(
    env.MONGODB_CONNECTION_ACCESS,
    { server: { poolSize: 5 }}
  );

import * as mongoose from 'mongoose';
import { env } from '../env.config';

(<any>mongoose).Promise = Promise;

interface EnvironmentConnection extends mongoose.ConnectionOptions {
  useMongoClient?: boolean;
  poolSize: number;
}
// https://github.com/Automattic/mongoose/issues/5442
const option: EnvironmentConnection = {
  poolSize: 5,
  useMongoClient: env.NODE_ENV === 'production',
};

export const connection: mongoose.Connection = mongoose
  .createConnection(
  env.MONGODB_CONNECTION,
  option,
);

export const connectionAccess: mongoose.Connection = mongoose.
  createConnection(
  env.MONGODB_CONNECTION_ACCESS,
  option,
);

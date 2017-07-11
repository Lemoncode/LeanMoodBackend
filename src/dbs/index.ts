import * as mongoose from 'mongoose';
// import * as bluebird from 'bluebird';
import { env } from '../env.config';

(<any>mongoose).Promise = Promise;

const connection : mongoose.Connection = mongoose
    .createConnection(
        env.MONGODB_CONNECTION, 
        { server: { poolSize: 5 }}
    );

export default connection;
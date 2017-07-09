import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { env } from './env.config';
import { loginRouter } from './routers';
import { IUserModel, userSchema } from './models/User';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const MONGODB_CONNECTION: string = 'mongodb://localhost/leanMood';
let connection : mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
const User: mongoose.Model<IUserModel> = connection.model<IUserModel>('User', userSchema);

// new User({
//     loginName: 'jai',
//     password: 'test'
// })
// .save()
// .then(result => { console.log(result)});


// const user = connection.db.collection("User");
// user.save({
//     loginName: 'jai',
//     password: 'test'
// })
// .then(result => console.log(result))
// .catch(err => console.log(err))

app.use('/api/login', loginRouter(User));
app.listen(env.PORT);

console.log(`Running on port ${env.PORT}`);

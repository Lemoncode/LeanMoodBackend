import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { env } from './env.config';
import { loginRouter } from './routers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/login', loginRouter());
app.listen(env.PORT);

console.log(`Running on port ${env.PORT}`);

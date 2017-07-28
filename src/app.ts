import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { env } from './env.config';
import { loginRouter } from './routers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', loginRouter());
app.listen(env.PORT);

// tslint:disable-next-line:no-console
console.log(`Running on port ${env.PORT}`);

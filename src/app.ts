import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { env } from './env.config';
import { loginRouter } from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', loginRouter);

app.listen(env.LM_PORT);

console.log(`Running on port ${env.LM_PORT}`);
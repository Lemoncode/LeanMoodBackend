import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { env } from './env.config';
import { loginRouter } from './routers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Additional configuration to make CORS working
// Once we get to a more mature state we have to
// fine tune the origing domain, etc...
// https://www.npmjs.com/package/cors
// https://stackoverflow.com/questions/7067966/how-to-allow-cors
app.use(cors({credentials: true, origin: true}));


app.use('/api/login', loginRouter());
app.listen(env.PORT);

console.log(`Running on port ${env.PORT}`);

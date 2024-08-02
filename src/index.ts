/* eslint-disable @typescript-eslint/semi */
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(config.port, () => {
  console.log(`Server running on port @ ${config.hostUrl}`);
});

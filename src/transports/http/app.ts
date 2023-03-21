import express from 'express';
const dotenv = require('dotenv');
dotenv.config();
import { LIMIT_SIZE_DATA, SERVER_PORT } from '../../config/config';
import morgan from 'morgan';
import cors from 'cors';
import Helmet from 'helmet';
import bodyParser from 'body-parser';
import { v1_router } from './api/v1';
const app = express();
app.use(Helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: LIMIT_SIZE_DATA }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const origin = {
  origin: '*'
};
app.use(cors(origin));
app.use('/api/v1', v1_router);
// const PORT = process.env.PORT || 5000;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at https://127.0.0.1:${SERVER_PORT}`);
});

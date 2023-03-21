import express from 'express';
import { accountRouter } from '../account';

const v1_router = express.Router();

v1_router.get('/health_check', (req, res) => {
  return res.json({ message: 'OK!' });
});

v1_router.use('/accounts', accountRouter);

export { v1_router };

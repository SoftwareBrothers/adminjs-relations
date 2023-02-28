import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import 'reflect-metadata';
import express from 'express';
import setupAdmin from './admin';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
const port = process.env.PORT ?? 8080;

const run = async (): Promise<void> => {
  await setupAdmin(app);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

run();

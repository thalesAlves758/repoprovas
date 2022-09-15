import express, { Application } from 'express';
import cors from 'cors';
import router from './routes/index.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(router);

export default app;

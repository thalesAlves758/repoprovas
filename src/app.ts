import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index.routes';
import errorHandler from './middlewares/errorHandler.middleware';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;

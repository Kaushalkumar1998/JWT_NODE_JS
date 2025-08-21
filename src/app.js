import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import logger from './logger/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));
app.use(userRoutes);
app.use(errorMiddleware);

export default app;


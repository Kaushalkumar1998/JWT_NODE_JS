import logger from "../logger/index.js";

const errorMiddleware = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack });
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (process.env.NODE_ENV === 'development') {
        return res.status(status).json({ message, stack: err.stack });
    }
    return res.status(status).json({ message });
}
export default errorMiddleware;
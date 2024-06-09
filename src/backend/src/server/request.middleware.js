import winston from 'winston';
import crypto from 'crypto';
import { performance } from 'node:perf_hooks';

const logger = winston.loggers.get('SERVER');

/**
 * Middleware to log incoming requests
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const requestLogger = (req, res, next) => {
  const { method, path, query } = req;
  const requestId = crypto.randomUUID();

  const start = performance.now();

  logger.info(`Request started: ${requestId}`, {
    method,
    path,
    requestId,
    query,
  });

  req.locals = {
    requestId,
  };

  res.on('finish', () => {
    const end = performance.now();

    const metatdata = {
      requestId,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      duratiuon: end - start,
      status: res.statusCode,
    };

    logger.info(`Request ended: ${requestId}`, metatdata);
  });

  next();
};

// setup environment
import EnvConfig from './config/env.config.js';
import './config/logging.config.js';

import express from 'express';
import hpp from 'hpp';
import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import winston from 'winston';

import { requestLogger } from './server/request.middleware.js';

import AuthApiRouter from './api/auth/router.js';

const serverLogger = winston.loggers.get('SERVER');

// *************************************************
// Server Setup
// *************************************************
const app = express();

// cors setup
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Security
app.use(helmet());
app.use(xss()); // prevents cross site attacks
app.use(hpp()); // Prevent http param pollution

app.use(requestLogger);

// *************************************************
// Server Start
// *************************************************
app.listen(EnvConfig.PORT, () => {
  serverLogger.info(`Backend App on PORT ${EnvConfig.PORT}`);
});

app.get('/', (req, res) => {
  res.json({
    mem: process.memoryUsage(),
    uptime: process.uptime(),
  });
});

app.use('/api/auth', AuthApiRouter);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  serverLogger.error(err, { customMessage: 'unhandledRejection' });
});

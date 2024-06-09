import winston from 'winston';

winston.loggers.add('DEFAULT', {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'backend', subService: 'default' },
  transports: [new winston.transports.Console()],
});

winston.loggers.add('SERVER', {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'backend', subService: 'server' },
  transports: [new winston.transports.Console()],
});

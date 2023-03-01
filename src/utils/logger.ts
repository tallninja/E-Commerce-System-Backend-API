import winston, { format } from 'winston';

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  defaultMeta: { service: 'ecomm-backend-service' },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
});

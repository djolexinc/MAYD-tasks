import * as winston from 'winston';
import { Logger } from './ILogger';

export class CustomLogger implements Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
            ],
        });
    }

    error(message: string, meta?: Record<string, any>): void {
        this.log('error', message, meta);
    }

    warn(message: string, meta?: Record<string, any>): void {
        this.log('warn', message, meta);
    }

    info(message: string, meta?: Record<string, any>): void {
        this.log('info', message, meta);
    }

    debug(message: string, meta?: Record<string, any>): void {
        this.log('debug', message, meta);
    }

    private log(level: string, message: string, meta?: Record<string, any>): void {
        if (process.env.NODE_ENV === 'test') {
            // test
            console[level](message, meta);
        } else {
             this.logger.log({ level, message, ...meta });
        }
    }
}
export { Logger };

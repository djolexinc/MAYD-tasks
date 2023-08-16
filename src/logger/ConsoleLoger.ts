import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {
    debug(message: string): void {
        console.debug(`DEBUG: ${message}`);
    }

    info(message: string | any): void {
        if (typeof message === 'string') {
            console.log(`INFO: ${message}`);
        } else {
            console.log('INFO:', message);
        }
    }

    warn(message: string): void {
        console.warn(`WARNING: ${message}`);
    }

    error(message: string): void {
        console.error(`ERROR: ${message}`);
    }
}

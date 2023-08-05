"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const winston = require("winston");
class CustomLogger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
            ],
        });
    }
    error(message, meta) {
        this.log('error', message, meta);
    }
    warn(message, meta) {
        this.log('warn', message, meta);
    }
    info(message, meta) {
        this.log('info', message, meta);
    }
    debug(message, meta) {
        this.log('debug', message, meta);
    }
    log(level, message, meta) {
        if (process.env.NODE_ENV === 'test') {
            // test
            console[level](message, meta);
        }
        else {
            this.logger.log(Object.assign({ level, message }, meta));
        }
    }
}
exports.CustomLogger = CustomLogger;

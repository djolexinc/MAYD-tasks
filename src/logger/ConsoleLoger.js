"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    debug(message) {
        console.debug(`DEBUG: ${message}`);
    }
    info(message, additionalInfo) {
        console.log(`INFO: ${message}: ${additionalInfo}`);
    }
    warn(message) {
        console.warn(`WARNING: ${message}`);
    }
    error(message) {
        console.error(`ERROR: ${message}`);
    }
}
exports.ConsoleLogger = ConsoleLogger;

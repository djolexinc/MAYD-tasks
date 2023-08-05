"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogParser = void 0;
const logger_1 = require("../logger/logger");
class LogParser {
    parseLog(logText) {
        const logger = new logger_1.CustomLogger();
        const logEntries = [];
        const lines = logText.split('\n');
        for (const line of lines) {
            try {
                const [timestamp, loglevel, logData] = line.split(' - ');
                const logObject = JSON.parse(logData);
                if (loglevel === 'error' && logObject.err) {
                    const { transactionId, err } = logObject;
                    const timestampEpoch = new Date(timestamp).getTime();
                    logEntries.push({
                        timestamp: timestampEpoch,
                        loglevel,
                        transactionId,
                        err
                    });
                }
            }
            catch (error) {
                logger.error(`Error parsing JSON data in line: ${line}`);
            }
        }
        return logEntries;
    }
}
exports.LogParser = LogParser;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogProcessor = void 0;
const fs = require("fs");
const readline = require("readline");
const logger_1 = require("../logger/logger");
class LogProcessor {
    constructor(inputFile, outputFile, logParser) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.logParser = logParser;
    }
    processLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const logger = new logger_1.CustomLogger();
            try {
                const readStream = fs.createReadStream(this.inputFile, 'utf8');
                const writeStream = fs.createWriteStream(this.outputFile, 'utf8');
                const rl = readline.createInterface({
                    input: readStream,
                    output: writeStream,
                    terminal: false
                });
                rl.on('line', (line) => {
                    try {
                        const [timestamp, loglevel, logData] = line.split(' - ');
                        const logObject = JSON.parse(logData);
                        if (loglevel === 'error' && logObject.err) {
                            const { transactionId, err } = logObject;
                            const timestampEpoch = new Date(timestamp).getTime();
                            const logEntry = {
                                timestamp: timestampEpoch,
                                loglevel,
                                transactionId,
                                err
                            };
                            writeStream.write(JSON.stringify(logEntry) + '\r\n');
                        }
                    }
                    catch (error) {
                        logger.error(`Error parsing JSON data in line: ${line}`);
                    }
                });
                yield new Promise((resolve) => {
                    writeStream.on('finish', () => {
                        logger.info('Log parsing complete.');
                        resolve();
                    });
                });
            }
            catch (error) {
                logger.error(`An error occurred: ${error.message}`);
            }
        });
    }
}
exports.LogProcessor = LogProcessor;

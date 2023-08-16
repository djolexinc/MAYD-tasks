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
exports.LogParser = void 0;
const fileReader_1 = require("../service/fileReader");
const fileWriter_1 = require("../service/fileWriter");
const ConsoleLoger_1 = require("../logger/ConsoleLoger");
class LogParser {
    parseLog(logText) {
        const logEntries = [];
        const lines = logText.split('\n');
        for (const line of lines) {
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
        return logEntries;
    }
}
exports.LogParser = LogParser;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFile = process.argv[3];
        const outputFile = process.argv[5];
        const logger = new ConsoleLoger_1.ConsoleLogger();
        if (!inputFile || !outputFile) {
            logger.error('Start with - node parser.js --input <inputFile> --output <outputFile>');
            return;
        }
        try {
            const fileReader = new fileReader_1.TextFileReader();
            const logText = yield fileReader.readFile(inputFile);
            const parser = new LogParser();
            const logEntries = parser.parseLog(logText);
            logger.info(logEntries);
            const errorEntries = logEntries.filter(entry => entry.loglevel === 'error');
            const errorEntriesJSON = JSON.stringify(errorEntries, null, 0);
            const fileWriter = new fileWriter_1.TextFileWriter();
            yield fileWriter.writeToFile(outputFile, errorEntriesJSON);
            logger.info('Log parsing complete.');
        }
        catch (error) {
            logger.info('An error occurred:', error.message);
        }
    });
}
main();

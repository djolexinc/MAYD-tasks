
import { LogParser } from './logParser/parser';
import { LogProcessor } from './service/logProcessor';
import { CustomLogger } from './logger/logger';

const args = require('minimist')(process.argv.slice(2));
const inputFile = args.input || args.i;
const outputFile = args.output || args.o;

async function main() {
    const logger = new CustomLogger();

    if (!inputFile || !outputFile) {
        logger.error('Start with - node main.js --input <inputFile> --output <outputFile>');
        return;
    }

    const logParser = new LogParser();
    const logProcessor = new LogProcessor(inputFile, outputFile, logParser);

    await logProcessor.processLogs();
}

main();

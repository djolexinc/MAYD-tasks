import { ILogParser, LogEntry } from './ILogParser';
import { TextFileReader } from '../service/fileReader';
import { TextFileWriter } from '../service/fileWriter';
import { ConsoleLogger } from '../logger/ConsoleLoger';


export class LogParser implements ILogParser {
    parseLog(logText: string): LogEntry[] {
        const logEntries: LogEntry[] = [];

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


async function main() {
    const inputFile = process.argv[3];
    const outputFile = process.argv[5];
    const logger = new ConsoleLogger();

    if (!inputFile || !outputFile) {
        logger.error('Start with - node parser.js --input <inputFile> --output <outputFile>');
        return;
    }

    try {
        const fileReader = new TextFileReader(); 
        const logText = await fileReader.readFile(inputFile);

        const parser: ILogParser = new LogParser();
        const logEntries: LogEntry[] = parser.parseLog(logText);
        logger.info(`Data: ${logEntries}`);

        const errorEntries = logEntries.filter(entry => entry.loglevel === 'error');
        const errorEntriesJSON = JSON.stringify(errorEntries, null, 0);

        const fileWriter = new TextFileWriter();
        await fileWriter.writeToFile(outputFile, errorEntriesJSON);

        logger.info('Log parsing complete.');
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        //todo make it work with logger.error("Message", {metadata})
    }
}

main();
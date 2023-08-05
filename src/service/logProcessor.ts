import * as fs from 'fs';
import * as readline from 'readline';
import { CustomLogger } from '../logger/logger';

export class LogProcessor {
    constructor(
        private readonly inputFile: string,
        private readonly outputFile: string,
    ) {}

    async processLogs(): Promise<void> {
        const logger = new CustomLogger();

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
                } catch (error) {
                    logger.error(`Error parsing JSON data in line: ${line}`);
                }
            });

            await new Promise<void>((resolve) => {
                writeStream.on('finish', () => {
                    logger.info('Log parsing complete.');
                    resolve();
                });
            });
        } catch (error) {
            logger.error(`An error occurred: ${error.message}`);
        }
    }
}

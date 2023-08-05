import { ILogParser, LogEntry } from './ILogParser';
import { CustomLogger } from '../logger/logger';

export class LogParser implements ILogParser {
    parseLog(logText: string): LogEntry[] {
        const logger = new CustomLogger();
        const logEntries: LogEntry[] = [];

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
            } catch (error) {
                logger.error(`Error parsing JSON data in line: ${line}`);
            }
        }

        return logEntries;
    }
}
import { LogParser } from '../../src/logParser/logParser';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

describe('LogParser', () => {
    it('should parse log entries correctly', async () => {
        const logFilePath = path.join(__dirname, '../../app.log');

        try {
            const logText = await fsPromises.readFile(logFilePath, 'utf-8');
            const parser = new LogParser();
            const logEntries = parser.parseLog(logText);

            expect(logEntries).toHaveLength(1);
            expect(logEntries[0].loglevel).toBe('error');
            expect(logEntries[0].transactionId).toBe('9abc55b2-807b-4361-9dbe-aa88b1b2e978');
            expect(logEntries[0].err).toBe('Not found');
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    });
});

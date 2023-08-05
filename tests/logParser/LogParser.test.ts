import { LogParser } from '../../src/logParser/parser';

describe('LogParser', () => {
    it('should parse log entries correctly', () => {
        const logText = `
            2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}
            2021-08-09T02:12:51.260Z - debug - {"transactionId":"12345678","details":"Some debug message"}
        `;
        
        const parser = new LogParser();
        const logEntries = parser.parseLog(logText);

        expect(logEntries).toHaveLength(1);
        expect(logEntries[0].loglevel).toBe('error');
        expect(logEntries[0].transactionId).toBe('9abc55b2-807b-4361-9dbe-aa88b1b2e978');
        expect(logEntries[0].err).toBe('Not found');
    });

    it('should handle invalid log entries gracefully', () => {
        const logText = `
            2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}
            This is an invalid log entry
        `;

        const parser = new LogParser();
        const logEntries = parser.parseLog(logText);

        expect(logEntries).toHaveLength(1);
    });
});


export interface ILogParser {
    parseLog(logText: string): LogEntry[];
}

export interface LogEntry {
    timestamp: number;
    loglevel: string;
    transactionId: string;
    err?: string;
}

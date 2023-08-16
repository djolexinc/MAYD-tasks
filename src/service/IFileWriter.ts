export interface IFileWriter {
    writeToFile(filePath: string, data: string): Promise<void>;
}
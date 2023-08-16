export interface IFileReader {
    readFile(filePath: string): Promise<string>;
}
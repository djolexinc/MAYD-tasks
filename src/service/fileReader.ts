import { IFileReader } from './IFileReader';
import { promises as fsPromises } from 'fs';

export class TextFileReader implements IFileReader {
    async readFile(filePath: string): Promise<string> {
        try {
            const data = await fsPromises.readFile(filePath, 'utf-8');
            return data;
        } catch (error) {
            console.error(`Error reading from ${filePath}: ${error.message}`);
            throw error;
        }
    }
}

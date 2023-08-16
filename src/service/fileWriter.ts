import { IFileWriter } from './IFileWriter';
import { promises as fsPromises } from 'fs';

export class TextFileWriter implements IFileWriter {
    async writeToFile(filePath: string, data: string): Promise<void> {
        try {
            await fsPromises.writeFile(filePath, data, 'utf-8');
            console.log(`Data written to ${filePath}`);
        } catch (error) {
            console.error(`Error writing to ${filePath}: ${error.message}`);
            throw error;
        }
    }
}

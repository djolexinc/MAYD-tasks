import * as fs from 'fs/promises';
import { TextFileWriter } from '../../src/service/fileWriter';

describe('TextFileWriter', () => {
    it('should write to a text file correctly', async () => {
        const filePath = 'test-output.log';
        const data = 'Test data to write';

        const writer = new TextFileWriter();
        await writer.writeToFile(filePath, data);

        const writtenContent = await fs.readFile(filePath, 'utf-8');
        expect(writtenContent).toBe(data);
    });
});

import { TextFileReader } from '../../src/service/fileReader';
describe('TextFileReader', () => {
    it('should read a text file correctly', async () => {
        const filePath = './testApp.log';
        const expectedContent = 'Test content of the file';

        const reader = new TextFileReader();
        const content = await reader.readFile(filePath);

        expect(content).toBe(expectedContent);
    });
});

// import * as fs from 'fs';
// import { LogProcessor } from '../../src/service/logProcessor';
// import { LogParser } from '../../src/logParser/parser';

// describe('LogProcessor', () => {
//     it('should process a log entry correctly', async () => {
//         const sampleLogLine =
//             '2023-08-21T12:00:00.000Z - error - {"transactionId":"12345","err":"Error message"}';

//         const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockReturnValue(
//             new (require('stream').Readable)({
//                 read(size) {
//                     this.push(sampleLogLine);
//                     this.push(null);
//                 },
//             })
//         );
//         const mockCreateWriteStream = jest.spyOn(fs, 'createWriteStream').mockReturnValue(

//             new (require('stream').Writable)({
//                 write(chunk, encoding, callback) {
//                     callback();
//                 },
//             })
//         );

//         const logParser = new LogParser()
//         const logProcessor = new LogProcessor('input.log', 'output.log');
//         await logProcessor.processLogs();

//         expect(mockCreateReadStream).toHaveBeenCalledWith('input.log', 'utf8');
//         expect(mockCreateWriteStream).toHaveBeenCalledWith('output.log', 'utf8');

//     });
// });

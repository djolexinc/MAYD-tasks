import { CustomLogger } from '../../src/logger/logger';

describe('CustomLogger', () => {
    it('should log info messages', () => {
        const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

        const logger = new CustomLogger();
        logger.info('test');

        expect(consoleInfoSpy).toHaveBeenCalledWith('test', undefined);

        consoleInfoSpy.mockRestore();
    });
    it('should log info messages', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        const logger = new CustomLogger();
        logger.error('error', {err: 'error'});

        expect(consoleError).toHaveBeenCalledWith('error', {"err": "error"});
        
        consoleError.mockRestore();
    });
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./logParser/parser");
const logProcessor_1 = require("./service/logProcessor");
const logger_1 = require("./logger/logger");
const args = require('minimist')(process.argv.slice(2));
const inputFile = args.input || args.i;
const outputFile = args.output || args.o;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.CustomLogger();
        if (!inputFile || !outputFile) {
            logger.error('Start with - node main.js --input <inputFile> --output <outputFile>');
            return;
        }
        const logParser = new parser_1.LogParser();
        const logProcessor = new logProcessor_1.LogProcessor(inputFile, outputFile, logParser);
        yield logProcessor.processLogs();
    });
}
main();

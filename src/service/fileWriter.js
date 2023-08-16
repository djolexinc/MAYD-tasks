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
exports.TextFileWriter = void 0;
const fs_1 = require("fs");
class TextFileWriter {
    writeToFile(filePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.writeFile(filePath, data, 'utf-8');
                console.log(`Data written to ${filePath}`);
            }
            catch (error) {
                console.error(`Error writing to ${filePath}: ${error.message}`);
                throw error;
            }
        });
    }
}
exports.TextFileWriter = TextFileWriter;

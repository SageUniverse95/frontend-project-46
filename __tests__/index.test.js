import {
  describe, expect, test,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDif from '../src/index.js';

describe('genDif', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturepath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const nameOfFile1 = 'file1.json';
  const nameOfFile2 = 'file2.json';
  const nameOfTrueAnswer = 'correctAnswer.txt';

  const file1 = getFixturepath(nameOfFile1);
  const file2 = getFixturepath(nameOfFile2);
  const trueAnswer = getFixturepath(nameOfTrueAnswer);

  test('search differences', () => {
    expect(genDif(file1, file2)).toEqual(fs.readFileSync(trueAnswer, 'utf-8'));
  });
});

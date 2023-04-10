import {
  describe, expect, test,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDif from '../src/index.js';

describe('genDiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const nameOfFileJson1 = 'file1.json';
  const nameOfFileJson2 = 'file2.json';

  const nameOfFileYML1 = 'file1.yml';
  const nameOfFileYML2 = 'file2.yml';

  const nameOfFileStylish = 'correctAnswerStylish.txt';
  const nameOfFilePlain = 'correctAnswerPlain.txt';
  const nameOfFileJSON = 'correctAnswerJSON.txt';

  test.each(
    [
      {
        obj1: getFixturePath(nameOfFileJson1),
        obj2: getFixturePath(nameOfFileJson2),
        type: 'stylish',
        expected: fs.readFileSync(getFixturePath(nameOfFileStylish), 'utf-8'),
      },
      {
        obj1: getFixturePath(nameOfFileYML1),
        obj2: getFixturePath(nameOfFileYML2),
        type: 'stylish',
        expected: fs.readFileSync(getFixturePath(nameOfFileStylish), 'utf-8'),
      },
      {
        obj1: getFixturePath(nameOfFileJson1),
        obj2: getFixturePath(nameOfFileJson2),
        type: 'plain',
        expected: fs.readFileSync(getFixturePath(nameOfFilePlain), 'utf-8'),
      },
      {
        obj1: getFixturePath(nameOfFileYML1),
        obj2: getFixturePath(nameOfFileYML2),
        type: 'plain',
        expected: fs.readFileSync(getFixturePath(nameOfFilePlain), 'utf-8'),
      },
      {
        obj1: getFixturePath(nameOfFileJson1),
        obj2: getFixturePath(nameOfFileJson2),
        type: 'json',
        expected: fs.readFileSync(getFixturePath(nameOfFileJSON), 'utf-8'),
      },
    ],
  )('gendiff check with other type', ({
    obj1, obj2, type, expected,
  }) => {
    expect(genDif(obj1, obj2, type)).toEqual(expected);
  });
  test('gendiff with default format', () => {
    expect(genDif(
      getFixturePath(nameOfFileJson1),
      getFixturePath(nameOfFileJson2),
    )).toEqual(fs.readFileSync(getFixturePath(nameOfFileStylish), 'utf8'));
  });
});

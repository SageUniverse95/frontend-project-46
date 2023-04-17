import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDif from '../src/index.js';

describe('genDiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  test.each(
    [
      {
        fileName1: 'file1.json',
        fileName2: 'file2.json',
        type: 'stylish',
        internalTree: 'correctAnswerStylish.txt',
      },
      {
        fileName1: 'file1.yml',
        fileName2: 'file2.yml',
        type: 'stylish',
        internalTree: 'correctAnswerStylish.txt',
      },
      {
        fileName1: 'file1.json',
        fileName2: 'file2.json',
        type: 'plain',
        internalTree: 'correctAnswerPlain.txt',
      },
      {
        fileName1: 'file1.yml',
        fileName2: 'file2.yml',
        type: 'plain',
        internalTree: 'correctAnswerPlain.txt',
      },
      {
        fileName1: 'file1.json',
        fileName2: 'file2.json',
        type: 'json',
        internalTree: 'correctAnswerJSON.txt',
      },
      {
        fileName1: 'file1.json',
        fileName2: 'file2.json',
        type: undefined,
        internalTree: 'correctAnswerStylish.txt',
      },
    ],
  )('gendiff check with other type', ({
    fileName1, fileName2, type, internalTree,
  }) => {
    expect(genDif(getFixturePath(fileName1), getFixturePath(fileName2), type))
      .toEqual(fs.readFileSync(getFixturePath(internalTree), 'utf-8'));
  });
});

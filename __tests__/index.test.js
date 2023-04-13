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
        tree1: 'file1.json',
        tree2: 'file2.json',
        type: 'stylish',
        internalTree: 'correctAnswerStylish.txt',
      },
      {
        tree1: 'file1.yml',
        tree2: 'file2.yml',
        type: 'stylish',
        internalTree: 'correctAnswerStylish.txt',
      },
      {
        tree1: 'file1.json',
        tree2: 'file2.json',
        type: 'plain',
        internalTree: 'correctAnswerPlain.txt',
      },
      {
        tree1: 'file1.yml',
        tree2: 'file2.yml',
        type: 'plain',
        internalTree: 'correctAnswerPlain.txt',
      },
      {
        tree1: 'file1.json',
        tree2: 'file2.json',
        type: 'json',
        internalTree: 'correctAnswerJSON.txt',
      },
      {
        tree1: 'file1.json',
        tree2: 'file2.json',
        type: undefined,
        internalTree: 'correctAnswerStylish.txt',
      },
    ],
  )('gendiff check with other type', ({
    tree1, tree2, type, internalTree,
  }) => {
    expect(genDif(getFixturePath(tree1), getFixturePath(tree2), type))
      .toEqual(fs.readFileSync(getFixturePath(internalTree), 'utf-8'));
  });
});

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
  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const nameOfFileJson1 = 'file1.json';
  const nameOfFileJson2 = 'file2.json';

  const nameOfFileYML1 = 'file1.yml';
  const nameOfFileYML2 = 'file2.yml';

  const trueAnswerStyilish = 'correctAnswerStylish.txt';
  const trueAnswerPlain = 'correctAnswerPlain.txt';

  const fileJson1 = getFixturePath(nameOfFileJson1);
  const fileJson2 = getFixturePath(nameOfFileJson2);
  const fileYML1 = getFixturePath(nameOfFileYML1);
  const fileYML2 = getFixturePath(nameOfFileYML2);
  const trueAnswer = getFixturePath(trueAnswerStyilish);
  const trueAnswerWithPlain = getFixturePath(trueAnswerPlain);

  test('search differences with JSON files stylish format', () => {
    expect(genDif(fileJson1, fileJson2, 'stylish')).toEqual(fs.readFileSync(trueAnswer, 'utf-8'));
  });
  test('search differences with YML files stylish format', () => {
    expect(genDif(fileYML1, fileYML2, 'stylish')).toEqual(fs.readFileSync(trueAnswer, 'utf-8'));
  });

  test('search differences with JSON files plain format', () => {
    expect(genDif(fileJson1, fileJson2, 'plain')).toEqual(fs.readFileSync(trueAnswerWithPlain, 'utf-8'));
  });
  test('search differences with YML files plain format', () => {
    expect(genDif(fileYML1, fileYML2, 'plain')).toEqual(fs.readFileSync(trueAnswerWithPlain, 'utf-8'));
  });
});

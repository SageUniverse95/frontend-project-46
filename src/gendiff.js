#!/usr/bin/env node
import { Command } from 'commander';
import genDif from './index.js';

/* const stringfy = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, counter) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = counter * spacesCount;
    const currentIdent = replacer.repeat(indentSize);
    const backetIdent = replacer.repeat(indentSize - spacesCount);
    const arrOfObj = Object.entries(currentValue);
    const lines = arrOfObj.map(([key, valueOfObj]) =>
     `${currentIdent}${key}: ${iter(valueOfObj, counter + 1)}`);
    const result = ['{', ...lines, `${backetIdent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
}; */

const program = new Command();
program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f --format <type>', 'output format', 'stylish')
  .action((pathFile1, pathFile2) => console.log(genDif(pathFile1, pathFile2, program.opts.format)));

program.parse();

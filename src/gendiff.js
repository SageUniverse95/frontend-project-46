#!/usr/bin/env node
import { Command } from 'commander';
import genDif from './index.js';

const program = new Command();
program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f --format <type>', 'output format', 'stylish')
  .action((pathFile1, pathFile2) => {
    console.log(genDif(pathFile1, pathFile2, program.opts().format));
  });

program.parse();

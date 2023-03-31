import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const parser = (pathOfFile) => {
  let parse;
  if (path.extname(pathOfFile) === '.yml' || path.extname(pathOfFile) === '.ymal') {
    parse = yaml.load(fs.readFileSync(path.resolve(pathOfFile), 'utf-8'));
  } else if (path.extname(pathOfFile) === '.json') {
    parse = JSON.parse(fs.readFileSync(path.resolve(pathOfFile), 'utf-8'));
  }
  return parse;
};
export default parser;

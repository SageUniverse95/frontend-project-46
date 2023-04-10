import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const parse = (data, type) => {
  let parseFormat;
  if (type === '.yml' || type === '.ymal') {
    parseFormat = yaml.load(fs.readFileSync(path.resolve(data), 'utf-8'));
  } else if (type === '.json') {
    parseFormat = JSON.parse(fs.readFileSync(path.resolve(data), 'utf-8'));
  }
  return parseFormat;
};
export default parse;

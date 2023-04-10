import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const parse = (data, type) => {
  if (type === '.yml' || type === '.ymal') {
    return yaml.load(fs.readFileSync(path.resolve(data), 'utf-8'));
  } if (type === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve(data), 'utf-8'));
  }
  throw new Error(`Unknown type: ${type}`);
};
export default parse;

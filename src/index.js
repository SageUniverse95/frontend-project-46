import path from 'path';
import fs from 'fs';
import makeTree from './makeTree.js';
import formatSelection from './formaters/index.js';
import parse from './parser.js';

const getData = (pathOfFile) => {
  const data = fs.readFileSync(path.resolve(pathOfFile), 'utf-8');
  const type = path.extname(pathOfFile).slice(1, pathOfFile.length);
  return parse(data, type);
};

const genDif = (path1, path2, format = 'stylish') => {
  const internalTree = makeTree(getData(path1), getData(path2));
  return formatSelection(internalTree, format);
};
export default genDif;

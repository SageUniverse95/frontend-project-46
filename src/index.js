import path from 'path';
import fs from 'fs';
import makeTree from './makeTree.js';
import formatSelection from './formaters/index.js';
import parse from './parser.js';

const getData = (data) => fs.readFileSync(path.resolve(data), 'utf-8');
const getExtname = (data) => path.extname(data).slice(1, data.length);

const genDif = (path1, path2, format = 'stylish') => {
  const internalTree = makeTree(
    parse(getData(path1), getExtname(path1)),
    parse(getData(path2), getExtname(path2)),
  );
  return formatSelection(internalTree, format);
};
export default genDif;

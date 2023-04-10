import path from 'path';
import makeTree from './makeTree.js';
import formatSelection from './formaters/index.js';
import parse from './parser.js';

const genDif = (path1, path2, format = 'stylish') => {
  const file1 = parse(path1, path.extname(path1));
  const file2 = parse(path2, path.extname(path2));
  const internalTree = makeTree(file1, file2);
  return formatSelection(internalTree, format);
};
export default genDif;

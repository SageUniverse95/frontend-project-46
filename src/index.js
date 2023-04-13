import path from 'path';
import fs from 'fs';
import makeTree from './makeTree.js';
import formatSelection from './formaters/index.js';
import parse from './parser.js';

const genDif = (path1, path2, format = 'stylish') => {
  const tree1 = parse(
    fs.readFileSync(path.resolve(path1), 'utf-8'),
    path.extname(path1).slice(1, path1.length),
  );
  const tree2 = parse(
    fs.readFileSync(path.resolve(path2), 'utf-8'),
    path.extname(path2).slice(1, path2.length),
  );
  const internalTree = makeTree(tree1, tree2);
  return formatSelection(internalTree, format);
};
export default genDif;

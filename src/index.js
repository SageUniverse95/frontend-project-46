import path from 'path';
import fs from 'fs';
import makeTree from './makeTree.js';
import formatter from './formater.js';

const genDif = (path1, path2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
  const differences = makeTree(file1, file2);
  const result = formatter(differences);
  return result;
};
export default genDif;

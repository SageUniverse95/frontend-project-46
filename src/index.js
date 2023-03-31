import makeTree from './makeTree.js';
import formatter from './formater.js';
import parser from './parser.js';

const genDif = (path1, path2) => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const differences = makeTree(file1, file2);
  const result = formatter(differences);
  return result;
};
export default genDif;

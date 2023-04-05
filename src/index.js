import makeTree from './makeTree.js';
import formatSelection from './formaters/index.js';
import parser from './parser.js';

const genDif = (path1, path2, format) => {
  const file1 = parser(path1);
  const file2 = parser(path2);
  const differences = makeTree(file1, file2);
  const chooseFormat = formatSelection(differences, format);
  return chooseFormat;
};
export default genDif;

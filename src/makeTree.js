import _ from 'lodash';

const makeTree = (file1, file2) => {
  const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = allKeys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return {
        type: 'nested',
        key,
        child: makeTree(file1[key], file2[key]),

      };
    }
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      return {
        type: 'deleted',
        key,
        value1: file1[key],
      };
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      return {
        type: 'added',
        key,
        value1: file2[key],
      };
    }
    if (file1[key] !== file2[key]) {
      return {
        type: 'changed',
        key,
        value1: file1[key],
        value2: file2[key],
      };
    }
    if (file1[key] === file2[key]) {
      return {
        type: 'unchanged',
        key,
        value1: file1[key],

      };
    }
    return {};
  });
  return result;
};
export default makeTree;

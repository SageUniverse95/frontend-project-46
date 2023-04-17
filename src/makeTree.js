import _ from 'lodash';

const makeTree = (tree1, tree2) => {
  const allKeys = _.sortBy(_.union(Object.keys(tree1), Object.keys(tree2)));
  const differenceTree = allKeys.map((key) => {
    if (_.isPlainObject(tree1[key]) && _.isPlainObject(tree2[key])) {
      return {
        type: 'nested',
        key,
        children: makeTree(tree1[key], tree2[key]),

      };
    }
    if (Object.hasOwn(tree1, key) && !Object.hasOwn(tree2, key)) {
      return {
        type: 'deleted',
        key,
        value: tree1[key],
      };
    }
    if (!Object.hasOwn(tree1, key) && Object.hasOwn(tree2, key)) {
      return {
        type: 'added',
        key,
        value: tree2[key],
      };
    }
    if (!_.isEqual(tree1[key], tree2[key])) {
      return {
        type: 'changed',
        key,
        value1: tree1[key],
        value2: tree2[key],
      };
    }
    if (_.isEqual(tree1[key], tree2[key])) {
      return {
        type: 'unchanged',
        key,
        value: tree1[key],

      };
    }
    throw new Error(`Сorrupted input files: ${tree1} ${tree2}`);
  });
  return differenceTree;
};
export default makeTree;

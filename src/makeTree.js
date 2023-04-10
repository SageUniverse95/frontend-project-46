import _ from 'lodash';

const makeTree = (object1, object2) => {
  const allKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const result = allKeys.map((key) => {
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        type: 'nested',
        key,
        children: makeTree(object1[key], object2[key]),

      };
    }
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return {
        type: 'deleted',
        key,
        value: object1[key],
      };
    }
    if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      return {
        type: 'added',
        key,
        value: object2[key],
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        type: 'changed',
        key,
        value1: object1[key],
        value2: object2[key],
      };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return {
        type: 'unchanged',
        key,
        value: object1[key],

      };
    }
    return {};
  });
  return result;
};
export default makeTree;

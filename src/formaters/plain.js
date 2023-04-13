import _ from 'lodash';

const strigify = (object) => {
  if (_.isPlainObject(object)) {
    return '[complex value]';
  }
  if (_.isString(object)) {
    return `'${object}'`;
  }
  return object;
};

const generatePath = (object, currentPath) => (currentPath !== '' ? `${currentPath}.${object.key}` : `${object.key}`);

const makePlain = (differenceTree) => {
  const iter = (tree, currentPath) => {
    const result = tree.map((data) => {
      const current = generatePath(data, currentPath);
      switch (data.type) {
        case 'nested':
          return iter(data.children, current).join('\n');
        case 'added':
          return `Property '${current}' was added with value: ${strigify(data.value)}`;
        case 'deleted':
          return `Property '${current}' was removed`;
        case 'changed':
          return `Property '${current}' was updated. From ${strigify(data.value1)} to ${strigify(data.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: ${data.type}`);
      }
    });
    return result.filter(Boolean);
  };
  return iter(differenceTree, '').join('\n');
};
export default makePlain;

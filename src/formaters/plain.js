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

const makePlain = (dif) => {
  const iter = (object, currentPath) => {
    const filterObj = object.filter((obj) => obj.type !== 'unchanged');
    const result = filterObj.map((data) => {
      const current = generatePath(data, currentPath);
      if (data.type === 'nested') {
        return iter(data.child, current).join('\n');
      }
      if (data.type === 'added') {
        return `Property '${current}' was added with value: ${strigify(data.value1)}`;
      }
      if (data.type === 'deleted') {
        return `Property '${current}' was removed`;
      }
      if (data.type === 'changed') {
        return `Property '${current}' was updated. From ${strigify(data.value1)} to ${strigify(data.value2)}`;
      }
      return 'err';
    });
    return result;
  };
  return iter(dif, '').join('\n');
};
export default makePlain;

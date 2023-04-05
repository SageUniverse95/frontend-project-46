import _ from 'lodash';

const makeIndent = (depth, indent = ' ', numberOfIndents = 4, shiftLeft = 2) => {
  const result = (depth * numberOfIndents) - shiftLeft;
  return indent.repeat(result);
};

const stringfy = (data, depth) => {
  if (!_.isPlainObject(data) || data === null) {
    return String(data);
  }
  const line = Object.entries(data).map(([key, value]) => `${makeIndent(depth + 1)}  ${key}: ${stringfy(value, depth + 1)}`);
  return [
    '{',
    ...line,
    `${makeIndent(depth)}  }`,
  ].join('\n');
};

const makeStylish = (dif) => {
  const iter = (obj, depth = 1) => {
    const line = obj.map((data) => {
      if (data.type === 'nested') {
        return `${makeIndent(depth)}  ${data.key}: {\n${iter(data.child, depth + 1).join('\n')}\n  ${makeIndent(depth)}}`;
      }
      if (data.type === 'deleted') {
        return `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value1, depth)}`;
      }
      if (data.type === 'added') {
        return `${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value1, depth)}`;
      }
      if (data.type === 'changed') {
        return `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value1, depth)}\n${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value2, depth)}`;
      }
      if (data.type === 'unchanged') {
        return `${makeIndent(depth)}  ${data.key}: ${stringfy(data.value1, depth)}`;
      }
      return 'default message';
    });
    return line;
  };
  return `{\n${iter(dif, 1).join('\n')}\n}`;
};
export default makeStylish;

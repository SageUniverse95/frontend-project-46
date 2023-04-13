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

const makeStylish = (differenceTree) => {
  const iter = (tree, depth = 1) => {
    const line = tree.map((data) => {
      switch (data.type) {
        case 'nested':
          return `${makeIndent(depth)}  ${data.key}: {\n${iter(data.children, depth + 1).join('\n')}\n  ${makeIndent(depth)}}`;
        case 'deleted':
          return `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value, depth)}`;
        case 'added':
          return `${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value, depth)}`;
        case 'changed':
          return [
            `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value1, depth)}`,
            `${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${makeIndent(depth)}  ${data.key}: ${stringfy(data.value, depth)}`;
        default:
          throw new Error(`Unknown type: ${data.type}`);
      }
    });
    return line;
  };
  return `{\n${iter(differenceTree, 1).join('\n')}\n}`;
};
export default makeStylish;

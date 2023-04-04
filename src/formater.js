const makeIndent = (depth, indent = ' ', numberOfIndents = 4, shiftLeft = 2) => {
  const result = (depth * numberOfIndents) - shiftLeft;
  return indent.repeat(result);
};

const stringfy = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, counter) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = counter * spacesCount;
    const currentIdent = replacer.repeat(indentSize);
    const backetIdent = replacer.repeat(indentSize - spacesCount);
    const arrOfObj = Object.entries(currentValue);
    const lines = arrOfObj.map(([key, valueOfObj]) => `${currentIdent}${key}: ${iter(valueOfObj, counter + 1)}`);
    const result = ['{', ...lines, `${backetIdent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
};

const formatter = (dif) => {
  const iter = (obj, depth = 1) => {
    const line = obj.map((data) => {
      if (data.type === 'nested') {
        return `${makeIndent(depth)} ${data.key}: ${iter(data.child, depth + 1)}`;
      }
      if (data.type === 'deleted') {
        return `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value1)}`;
      }
      if (data.type === 'added') {
        return `${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value1)}`;
      }
      if (data.type === 'changed') {
        return `${makeIndent(depth)}- ${data.key}: ${stringfy(data.value1)}\n${makeIndent(depth)}+ ${data.key}: ${stringfy(data.value2)}`;
      }
      if (data.type === 'unchanged') {
        return `${makeIndent(depth)}  ${data.key}: ${stringfy(data.value1)}`;
      }
      return '';
    });
    const result = ['{', ...line, '}'].join('\n');
    return result;
  };
  return iter(dif, 1);
};
export default formatter;

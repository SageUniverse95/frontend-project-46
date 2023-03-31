const formatter = (obj, indent = '  ') => {
  const makeString = obj.map((data) => {
    if (data.type === 'deleted') {
      return `${indent}- ${data.key}: ${data.value1}`;
    }
    if (data.type === 'added') {
      return `${indent}+ ${data.key}: ${data.value1}`;
    }
    if (data.type === 'changed') {
      return `${indent}- ${data.key}: ${data.value1}\n${indent}+ ${data.key}: ${data.value2}`;
    }
    if (data.type === 'unchanged') {
      return `${indent}  ${data.key}: ${data.value1}`;
    }
    return '';
  });
  const result = ['{', ...makeString, '}'].join('\n');
  return result;
};
export default formatter;

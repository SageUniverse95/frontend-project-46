import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'yml':
    case 'ymal':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};
export default parse;

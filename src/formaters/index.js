import makeStylish from './stylish.js';
import makePlain from './plain.js';
import json from './json.js';

const formatSelection = (dif, format) => {
  if (format === 'stylish') {
    return makeStylish(dif);
  }
  if (format === 'plain') {
    return makePlain(dif);
  }
  if (format === 'json') {
    return json(dif);
  }
  return 'error';
};

export default formatSelection;

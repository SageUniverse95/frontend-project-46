import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatSelection = (dif, format) => {
  if (format === 'stylish') {
    return makeStylish(dif);
  }
  if (format === 'plain') {
    return makePlain(dif);
  }
  return 'error';
};

export default formatSelection;

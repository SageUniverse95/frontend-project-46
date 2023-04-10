import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatSelection = (dif, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(dif);
    case 'plain':
      return makePlain(dif);
    case 'json':
      return JSON.stringify(dif, null, '');
    default:
      throw new Error(`Unknown format ${format}, check your input`);
  }
};

export default formatSelection;

const toLowerCase = (s) => {
  if (typeof s !== 'string') return '';
  return s.replace(' ', '').toLowerCase();
};

module.exports = toLowerCase;

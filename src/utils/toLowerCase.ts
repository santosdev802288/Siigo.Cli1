const toLowerCase = (s: any) => {
    if (typeof s !== 'string') return '';
    return s.replace(' ', '').toLowerCase();
};

module.exports = toLowerCase;

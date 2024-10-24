const R = require('ramda');

module.exports = R.curry((array, value) => R.includes(value, array));

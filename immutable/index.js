var jsan = require('jsan');
var serialize = require('./serialize');

var stringifyOptions = {
  'refs': false,
  'date': true,
  'function': true,
  'regex': true,
  'undefined': true,
  'error': true,
  'symbol': true,
  'map': true,
  'set': true,
  'nan': true,
  'infinity': true
};

module.exports = function(Immutable, refs) {
  return {
    stringify: function(data) {
      return jsan.stringify(data, serialize(Immutable, refs).replacer, null, stringifyOptions);
    },
    parse: function(data) {
      return jsan.parse(data, serialize(Immutable, refs).reviver);
    },
    serialize: serialize
  }
};

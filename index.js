var jsan = require('jsan');
var serialize = require('./serialize');

module.exports = function(Immutable) {
  return {
    stringify: function(data) {
      return jsan.stringify(data, serialize(Immutable).replacer, null, true);
    },
    parse: function(data) {
      return jsan.parse(data, serialize(Immutable).reviver);
    },
    serialize: serialize
  }
};

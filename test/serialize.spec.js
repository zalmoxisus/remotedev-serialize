var Immutable = require('immutable');
var serialize = require('../');
var stringify = serialize.stringify;
var parse = serialize.parse;

var data = {
  map: Immutable.Map({ a: 1, b: 2, c: 3, d: 4 }),
  orderedMap: Immutable.OrderedMap({ a: 1, b: 2, c: 3, d: 4 }),
  list: Immutable.List([1,2,3,4,5,6,7,8,9,10]),
  range: Immutable.Range(0,7),
  repeat: Immutable.Repeat('hi', 100),
  set: Immutable.Set([10,9,8,7,6,5,4,3,2,1]),
  orderedSet: Immutable.OrderedSet([10,9,8,7,6,5,4,3,2,1]),
  seq: Immutable.Seq.of(1,2,3,4,5,6,7,8),
  stack: Immutable.Stack.of('a', 'b', 'c')
};

var stringified = {};
describe('Stringify', function () {
  Object.keys(data).forEach(function (key) {
    it(key, function () {
      stringified[key] = stringify(data[key]);
      expect(stringified[key]).toMatchSnapshot();
    });
  });
});

describe('Parse', function () {
  Object.keys(data).forEach(function(key) {
    it(key, function() {
      expect(parse(stringified[key])).toEqual(data[key]);
    });
  });
});

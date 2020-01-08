var helpers = require('../helpers');
var mark = helpers.mark;
var extract = helpers.extract;
var extractArray = helpers.extractArray;
var refer = helpers.refer;

describe('Helpers', function () {
  it('mark', function() {
    expect(mark({ testData: 'test' }, 'testType')).toMatchSnapshot();
    expect(mark({ testData: 'test' }, 'testType', 'toString')).toMatchSnapshot();
  });

  it('extract', function() {
    expect(extract({ testData: 'test' }, 'testType')).toMatchSnapshot();
  });

  it('extractArray', function() {
    expect(extractArray([ 'Test', 'Data' ], 'testType')).toMatchSnapshot();
    expect(extractArray([ 'Test', 'Data' ], 'testType', 'toString')).toMatchSnapshot();
  });

  it('refer', function() {
    var TestClass = function(data) { return data; };
    var testInstance = new TestClass({ testData: 'test' });
    expect(refer(testInstance, 'testType', false, [TestClass])).toMatchSnapshot();
  });

});

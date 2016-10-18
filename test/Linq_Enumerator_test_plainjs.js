const assert = require('assert');
const TS = require('../node_modules/typescript-linq/TS');

suite("TS.Linq.Enumerator (plain js)", () =>
{
  suite("constructor (plain js)", () => 
  {

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called without an argument.", () => 
    {
      assert.throws(() =>
      {
        let enumeratorObj = new TS.Linq.Enumerator();
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called without an argument.");
    });

    test("The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'generator' argument.", () => 
    {
      assert.throws(() =>
      {
        let enumeratorObj = new TS.Linq.Enumerator(faileGenerator);
      }, TS.InvalidInvocationException, "The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'generator' argument.");
    });

    test("The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'source' argument.", () => 
    {
      assert.throws(() =>
      {
        let enumeratorObj = new TS.Linq.Enumerator({});
      }, TS.InvalidInvocationException, "The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'source' argument.");
    });

    test("The constructor should fail with a \"TypeError\" exception when called as function.", () => 
    {
      assert.throws(() =>
      {
        //call the constructor as a function (without new)
        let enumeratorObj = TS.Linq.Enumerator();
        //See: http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
      }, TypeError, "The constructor should fail with a \"TypeError\" exception when called as function.");
    });

  });
});
const assert = require('assert');
const TS = require('../node_modules/typescript-linq/TS');

suite("TS.Linq.OrderedEnumerator (plain js)", () =>
{

  suite("constructor (plain js)", () => 
  {
    test("The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'enumerator' argument which is not iterable.", () => 
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator({}, (item) => item, (first, second) => 0);
      }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'enumerator' argument which is not iterable.");
    });

    test("The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'keySelector' argument which is not a function.", () => 
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, {}, (first, second) => 0);
      }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'keySelector' argument which is not a function.");
    });

    test("The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'comparer' argument which is not a function.", () => 
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, (item) => item, {});
      }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'comparer' argument which is not a function.");
    });
  });

  suite("thenBy (plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a function.", () => 
    {
      assert.throws(() =>
      {
        let orderedEnumerator = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, item => item, (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; });
        orderedEnumerator.thenBy(item => item, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a function.");
    });
  });

  suite("thenByDescending (plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a  function.", () => 
    {
      assert.throws(() =>
      {
        let orderedEnumerator = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, item => item, (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; });
        orderedEnumerator.thenByDescending(item => item, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a  function.");
    });
  });

});
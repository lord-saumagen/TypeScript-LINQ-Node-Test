const assert = require('assert');
const TS = require('../node_modules/typescript-linq/TS');

suite("TS.Utils (plainjs)", () => 
{

  suite("checkBitStringParameter(plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for an objcet 'parameter' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Utils.checkBitStringParameter("object", {}, "checkBitStringParameter");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");
    });
  });

  suite("byteToBitString (plain js)", () => 
  {
    test("Should throw a 'TS.InvalidTypeException' for a call with a value which is not a number.", () => 
    {
      assert.throws(function ()
      {
        TS.Utils.byteToBitString({});
      }, TS.InvalidTypeException, "Should throw a 'TS.InvalidTypeException' for a call with a value which is not a number.");
    });
  });

  suite("UByteToHexString (plain js)", () => 
  {
    test("The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't a number.", () => 
    {
      assert.throws(() =>
      {
        TS.Utils.UByteToHexString({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't a number.");
    });
  });

  suite("UInt32To4ByteArray (plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.", () => 
    {
      assert.throws(() =>
      {
        TS.Utils.UInt32To4ByteArray({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
    });
  });

  suite("UInt32ToHexString (plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.", () => 
    {
      assert.throws(() =>
      {
        TS.Utils.UInt32ToHexString({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
    });
  });

  suite("UInt32ToHexString (plain js)", () => 
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.", () => 
    {
      assert.throws(() =>
      {
        TS.Utils.UInt32ToHexString({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
    });
  });

});






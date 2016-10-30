/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="DATA.ts" />
import * as assert from 'assert';
import {TS} from '../node_modules/typescript-linq/TS';
import {DATA} from './DATA';

suite("TS.TypeCode.UInt64", () => 
{

  suite("TS.TypeCode.UInt64 constructor", () => 
  {
    let UInt64Num: TS.TypeCode.UInt64;

    test("Should return an object.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64();
      assert.ok(TS.Utils.Assert.isObject(UInt64Num), "Should return an object.");
    });

    test("The returned object should be an instance of TS.TypeCode.UInt64.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64();
      assert.ok(UInt64Num instanceof TS.TypeCode.UInt64, "The returned object should be an instance of TS.TypeCode.UInt64.");
    });

    test("The returned object should have a value of 0 when constructe with the default constructor.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64();
      assert.ok((UInt64Num.mostSignificantInteger == 0) && (UInt64Num.leastSignificantInteger == 0), "The returned object should have a value of 0 when constructe with the default constructor.");
    });

    test("Should return an object.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(1);
      assert.ok(TS.Utils.Assert.isObject(UInt64Num), "Should return an object.");
    });

    test("The returned object should be an instance of TS.TypeCode.UInt64.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(1);
      assert.ok(UInt64Num instanceof TS.TypeCode.UInt64, "The returned object should be an instance of TS.TypeCode.UInt64.");
    });

    test("The returned object should have a mostSignificantInteger value of 1.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(1);
      assert.ok((UInt64Num.mostSignificantInteger == 1) && (UInt64Num.leastSignificantInteger == 0), "The returned object should have a mostSignificantInteger value of 1.");
    });

    test("Should return an object.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0, 1);
      assert.ok(TS.Utils.Assert.isObject(UInt64Num), "Should return an object.");
    });

    test("The returned object should be an instance of TS.TypeCode.UInt64.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0, 1);
      assert.ok(UInt64Num instanceof TS.TypeCode.UInt64, "The returned object should be an instance of TS.TypeCode.UInt64.");
    });

    test("The returned object should have a leastSignificantInteger value of 1.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0, 1);
      assert.ok((UInt64Num.mostSignificantInteger == 0) && (UInt64Num.leastSignificantInteger == 1), "The returned object should have a leastSignificantInteger value of 1.");
    });

    test("Should return an object.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      assert.ok(TS.Utils.Assert.isObject(UInt64Num), "Should return an object.");
    });

    test("The returned object should be an instance of TS.TypeCode.UInt64.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      assert.ok(UInt64Num instanceof TS.TypeCode.UInt64, "The returned object should be an instance of TS.TypeCode.UInt64.");
    });

    test("The returned object should have the 'UInt64.MAX_VALUE'.", () => 
    {
      UInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      assert.ok((UInt64Num.mostSignificantInteger == TS.TypeCode.UInt64.MAX_VALUE.mostSignificantInteger) && (UInt64Num.leastSignificantInteger == TS.TypeCode.UInt64.MAX_VALUE.leastSignificantInteger), "The returned object should have the 'UInt64.MAX_VALUE'.");
    });

    test("The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a negative 'mostSignificantInteger' argument.", () => 
    {
      assert.throws(() =>
      {
        UInt64Num = new TS.TypeCode.UInt64(-1);
      }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a negative 'mostSignificantInteger' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentOutOfRangeException\" exception when called with a 'mostSignificantInteger' argument which is out of range.", () => 
    {
      assert.throws(() =>
      {
        UInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF + 1);
      }, TS.ArgumentOutOfRangeException, "The constructor should fail with a \"TS.ArgumentOutOfRangeException\" exception when called with a 'mostSignificantInteger' argument which is out of range.");
    });

    test("The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a negative 'leastSignificantInteger' argument.", () => 
    {
      assert.throws(() =>
      {
        UInt64Num = new TS.TypeCode.UInt64(0, -1);
      }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a negative 'leastSignificantInteger' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentOutOfRangeException\" exception when called with a 'leastSignificantInteger' argument which is out of range.", () => 
    {
      assert.throws(() =>
      {
        UInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF + 1);
      }, TS.ArgumentOutOfRangeException, "The constructor should fail with a \"TS.ArgumentOutOfRangeException\" exception when called with a 'leastSignificantInteger' argument which is out of range.");
    });

  });


  suite("TS.TypeCode.UInt64 add", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;
    let resultUInt64Num: TS.TypeCode.UInt64;

    test("The result UInt64 should be equal to UInt64.MAX_VALUE.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
      resultUInt64Num = TS.TypeCode.UInt64.add(firstUInt64Num, secondUInt64Num);
      TS.TypeCode.UInt64.MAX_VALUE.equal(resultUInt64Num);
      assert.ok(TS.TypeCode.UInt64.MAX_VALUE.equal(resultUInt64Num), "The result UInt64 should be equal to UInt64.MAX_VALUE.");
    });

    test("The result UInt64 should be equal to UInt64.MAX_VALUE.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
      resultUInt64Num = TS.TypeCode.UInt64.add(firstUInt64Num, secondUInt64Num);
      firstUInt64Num.add(secondUInt64Num);
      assert.ok(firstUInt64Num.equal(TS.TypeCode.UInt64.MAX_VALUE), "The result UInt64 should be equal to UInt64.MAX_VALUE.");
    });

    test("The call should fail with a \"TS.OverflowException\" for as sum which exceeds the UInt64.MAX_VALUE.", () =>
    {
      assert.throws(() =>
      {
        firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
        secondUInt64Num = new TS.TypeCode.UInt64(0, 1);
        resultUInt64Num = TS.TypeCode.UInt64.add(firstUInt64Num, secondUInt64Num);
      }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for as sum which exceeds the UInt64.MAX_VALUE.");
    });

    test("The call should fail with a \"TS.OverflowException\" for as sum which exceeds the UInt64.MAX_VALUE.", () =>
    {
      assert.throws(() =>
      {
        firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
        secondUInt64Num = new TS.TypeCode.UInt64(0, 1);
        firstUInt64Num.add(secondUInt64Num);
      }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for as sum which exceeds the UInt64.MAX_VALUE.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.add(null, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.add(undefined, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.add(firstUInt64Num, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.add(firstUInt64Num, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.");
    });
  });


  suite("TS.TypeCode.UInt64 addModulo", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;
    let resultUInt64Num: TS.TypeCode.UInt64;

    firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
    secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
    resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);

    test("The result UInt64 should be equal to UInt64.MAX_VALUE.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      TS.TypeCode.UInt64.MAX_VALUE.equal(resultUInt64Num);
      assert.ok(TS.TypeCode.UInt64.MAX_VALUE.equal(resultUInt64Num), "The result UInt64 should be equal to UInt64.MAX_VALUE.");
    });

    test("The result UInt64 should be equal to UInt64.MAX_VALUE.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      firstUInt64Num.add(secondUInt64Num);
      assert.ok(firstUInt64Num.equal(TS.TypeCode.UInt64.MAX_VALUE), "The result UInt64 should be equal to UInt64.MAX_VALUE.");
    });

    test("The returned object should have a value of 0.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 1);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      assert.ok(((resultUInt64Num.mostSignificantInteger == 0) && (resultUInt64Num.leastSignificantInteger == 0)), "The returned object should have a value of 0.");
    });

    test("The returned object should have a value of 0.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 1);
      firstUInt64Num.addModulo(secondUInt64Num);
      assert.ok(((firstUInt64Num.mostSignificantInteger == 0) && (firstUInt64Num.leastSignificantInteger == 0)), "The returned object should have a value of 0.");
    });

    test("The returned object should have a 'leastSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 2);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      assert.ok(((resultUInt64Num.mostSignificantInteger == 0) && (resultUInt64Num.leastSignificantInteger == 1)), "The returned object should have a 'leastSignificantInteger' value of 1.");
    });

    test("The returned object should have a 'leastSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 2);
      firstUInt64Num.addModulo(secondUInt64Num);
      assert.ok(((firstUInt64Num.mostSignificantInteger == 0) && (firstUInt64Num.leastSignificantInteger == 1)), "The returned object should have a 'leastSignificantInteger' value of 1.");
    });

    test("The returned object should have a 'mostSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(2);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      assert.ok(((resultUInt64Num.mostSignificantInteger == 1) && (resultUInt64Num.leastSignificantInteger == 0)), "The returned object should have a 'mostSignificantInteger' value of 1.");
    });

    test("The returned object should have a 'mostSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(2);
      firstUInt64Num.addModulo(secondUInt64Num);
      assert.ok(((firstUInt64Num.mostSignificantInteger == 1) && (firstUInt64Num.leastSignificantInteger == 0)), "The returned object should have a 'mostSignificantInteger' value of 1.");
    });

    test("The returned object should have a 'mostSignificantInteger' value of 1 and a 'leastSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(1, 2);
      resultUInt64Num = TS.TypeCode.UInt64.addModulo(firstUInt64Num, secondUInt64Num);
      assert.ok(((resultUInt64Num.mostSignificantInteger == 1) && (resultUInt64Num.leastSignificantInteger == 1)), "The returned object should have a 'mostSignificantInteger' value of 1 and a 'leastSignificantInteger' value of 1.");
    });

    test("The returned object should have a 'mostSignificantInteger' value of 1 and a 'leastSignificantInteger' value of 1.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(1, 2);
      firstUInt64Num.addModulo(secondUInt64Num);
      assert.ok(((firstUInt64Num.mostSignificantInteger == 1) && (firstUInt64Num.leastSignificantInteger == 1)), "The returned object should have a 'mostSignificantInteger' value of 1 and a 'leastSignificantInteger' value of 1.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.addModulo(null, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.addModulo(undefined, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.addModulo(firstUInt64Num, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.addModulo(firstUInt64Num, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.");
    });
  });


  suite("TS.TypeCode.UInt64 equal", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;

    test("The return value should be false for the equality comparsion of unequal numbers.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);
      assert.ok(!TS.TypeCode.UInt64.equal(firstUInt64Num, secondUInt64Num), "The return value should be false for the equality comparsion of unequal numbers.");
      assert.ok(!firstUInt64Num.equal(secondUInt64Num), "The return value should be false for the equality comparsion of unequal numbers.");
    });

    test("The return value should be true for the equality comparsion of equal numbers.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      assert.ok(TS.TypeCode.UInt64.equal(firstUInt64Num, secondUInt64Num), "The return value should be true for the equality comparsion of equal numbers.");
      assert.ok(firstUInt64Num.equal(secondUInt64Num), "The return value should be true for the equality comparsion of equal numbers.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.equal(null, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.equal(undefined, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.equal(firstUInt64Num, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.equal(firstUInt64Num, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.");
    });
  });


  suite("TS.TypeCode.UInt64 greater", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;

    firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
    secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);

    test("The return value should be false for the greater comparsion with a bigger number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);
      assert.ok(!TS.TypeCode.UInt64.greater(firstUInt64Num, secondUInt64Num), "The return value should be false for the greater comparsion of a number which is less than the compared number.");
      assert.ok(!firstUInt64Num.greater(secondUInt64Num), "The return value should be false for the greater comparsion with a bigger number.");
    });

    test("The return value should be true for the greater comparsion of smaller number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);
      assert.ok(TS.TypeCode.UInt64.greater(secondUInt64Num, firstUInt64Num), "The return value should be true for greater comparsion of a number which is bigger than the compared number.");
      assert.ok(secondUInt64Num.greater(firstUInt64Num), "The return value should be true for the greater comparsion of smaller number.");
    });

    test("The return value should be false for the greater comparsion with an equal number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      assert.ok(!TS.TypeCode.UInt64.greater(firstUInt64Num, secondUInt64Num), "The return value should be false for the greater comparsion of two equal numbers.");
      assert.ok(!firstUInt64Num.greater(secondUInt64Num), "The return value should be false for the greater comparsion with an equal number.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        secondUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
        TS.TypeCode.UInt64.greater(null, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        secondUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
        TS.TypeCode.UInt64.greater(undefined, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
        TS.TypeCode.UInt64.greater(firstUInt64Num, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
        TS.TypeCode.UInt64.greater(firstUInt64Num, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.");
    });

  });


  suite("TS.TypeCode.UInt64 less", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;

    test("The return value should be true for the less comparsion with a bigger number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);
      assert.ok(TS.TypeCode.UInt64.less(firstUInt64Num, secondUInt64Num), "The return value should be true for the less comparsion of a number which is less than the compared number.");
      assert.ok(firstUInt64Num.less(secondUInt64Num), "The return value should be true for the less comparsion with a bigger number.");
    });

    test("The return value should be false for the less comparsion with smaller number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x87654321, 0x12345678);
      assert.ok(!TS.TypeCode.UInt64.less(secondUInt64Num, firstUInt64Num), "The return value should be false for a less comparsion of a number which is bigger than the compared number.");
      assert.ok(!secondUInt64Num.less(firstUInt64Num), "The return value should be false for the less comparsion with smaller number.");
    });

    test("The return value should be false for the less comparsion with an equal number.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      secondUInt64Num = new TS.TypeCode.UInt64(0x12345678, 0x87654321);
      assert.ok(!TS.TypeCode.UInt64.less(firstUInt64Num, secondUInt64Num), "The return value should be false for the less comparsion of two equal numbers.");
      assert.ok(!firstUInt64Num.less(secondUInt64Num), "The return value should be false for the less comparsion with an equal number.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.less(null, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.less(undefined, secondUInt64Num);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'first' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.less(firstUInt64Num, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'second' argument value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.less(firstUInt64Num, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'second' argument value.");
    });
  });


  suite("TS.TypeCode.UInt64 UIntToUInt64", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;

    test("Should return the expected value.", () =>
    {
      firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(0xFFFFFFFF);
      secondUInt64Num = new TS.TypeCode.UInt64(0, 0xFFFFFFFF);
      assert.deepEqual(firstUInt64Num, secondUInt64Num, "Should return the expected value.");
    });

    test("Should return the expected value.", () =>
    {
      firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(0xFFFFFFFF + 1);
      secondUInt64Num = new TS.TypeCode.UInt64(1, 0);
      assert.deepEqual(firstUInt64Num, secondUInt64Num, "Should return the expected value.");
    });

    test("Should return the expected value.", () =>
    {
      firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(Number.MAX_SAFE_INTEGER);
      assert.ok((firstUInt64Num.leastSignificantInteger == 0xFFFFFFFF) && (firstUInt64Num.mostSignificantInteger == 2097151), "Should return the expected value.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an call with a value which exceeds the 'Number.MAX_SAFE_INTERGER' range.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(Number.MAX_SAFE_INTEGER + 1);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an call with a value which exceeds the 'Number.MAX_SAFE_INTERGER' range.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an call with a value which is not an unsigned integer.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(-1);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an call with a value which is not an unsigned integer.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an call with a float value.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(2.5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an call with a float value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a 'null' value.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a 'null' value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an call with an 'undefined' value.", () =>
    {
      assert.throws(() => 
      {
        firstUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an call with an 'undefined' value.");
    });
  });


  suite("TS.TypeCode.UInt64 UInt64ToUInt", () => 
  {
    let firstUInt64Num: TS.TypeCode.UInt64;
    let secondUInt64Num: TS.TypeCode.UInt64;


    test("Should return the expected value.", () =>
    {
      firstUInt64Num = new TS.TypeCode.UInt64(0, 0);
      secondUInt64Num = TS.TypeCode.UInt64.UIntToUInt64(Number.MAX_SAFE_INTEGER);
      assert.equal(TS.TypeCode.UInt64.UInt64ToUInt(firstUInt64Num), 0, "Should return the expected value.");
      assert.equal(TS.TypeCode.UInt64.UInt64ToUInt(secondUInt64Num), Number.MAX_SAFE_INTEGER, "Should return the expected value.");
    });

    test("The call should fail with a \"TS.OverflowException\" for an attempt to convert an UInt64 wihich exceeds the number 'Number.MAX_SAFE_INTERGER'.", () =>
    {
      secondUInt64Num.add(new TS.TypeCode.UInt64(0, 1));
      assert.throws(() => 
      {
        let result = TS.TypeCode.UInt64.UInt64ToUInt(secondUInt64Num)
      }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an attempt to convert an UInt64 wihich exceeds the number 'Number.MAX_SAFE_INTERGER'.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  for a call with a 'null' value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.UInt64ToUInt(null)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  for a call with a 'null' value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an call with an 'undefined' value.", () =>
    {
      assert.throws(() => 
      {
        TS.TypeCode.UInt64.UInt64ToUInt(undefined)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an call with an 'undefined' value.");
    });
  });

});
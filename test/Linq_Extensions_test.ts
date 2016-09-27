/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
import {TS} from '../node_modules/typescript-linq/TS';
import * as DATA from './DATA';
import * as assert from 'assert';

var custEnum: TS.Linq.Enumerator<DATA.DATA.ICustomer>;
var persEnum: TS.Linq.Enumerator<DATA.DATA.IPerson>;
var ordEnum: TS.Linq.Enumerator<DATA.DATA.IOrders>;
var numEnum: TS.Linq.Enumerator<number>;
var createStringArray: () => Array<string>;
var createNumberArray: () => Array<number>;
var createCarsArray: () => Array<DATA.DATA.ICar>;
var createCarsUnionTestArray: () => Array<DATA.DATA.Car>;
var createProductArray: () => Array<DATA.DATA.IProduct>;
var createSortTestArray: () => Array<DATA.DATA.ISortTestItem>;
var createRandomNumberArray: (numbers: number) => Array<number>;

suite("TS.Linq.Extensions", () =>
{
  before(function ()
  {
    // runs before all tests in this block
    custEnum = new TS.Linq.Enumerator<DATA.DATA.ICustomer>(DATA.DATA.CreateCustomerArray());
    persEnum = new TS.Linq.Enumerator<DATA.DATA.IPerson>(DATA.DATA.CreatePersonArray());
    ordEnum = new TS.Linq.Enumerator<DATA.DATA.IOrders>(DATA.DATA.CreateOrdersArray());
    numEnum = new TS.Linq.Enumerator<number>(DATA.DATA.CreateNumberArray());
    createNumberArray = DATA.DATA.CreateNumberArray;
    createStringArray = DATA.DATA.CreateStringArray;
    createCarsArray = DATA.DATA.CreateCarsArray;
    createCarsUnionTestArray = DATA.DATA.CreateCarsUnionTestArray;
    createProductArray = DATA.DATA.CreateProductArray;
    createSortTestArray = DATA.DATA.CreateSortTestArray;
    createRandomNumberArray = DATA.DATA.CreateRandomNumberArray;
  });


  suite("aggregate", () => 
  {
    let numberResult: number;
    let stringResult: string;
    let carNumberResult: number;
    let carStringResult: string;

    test("Should return '55' on TS.Linq.Enumerator<number>.", () => 
    {
      numberResult = TS.Linq.Extensions.aggregate(createNumberArray(), (first, second) =>
      {
        return first + second;
      });
      assert.equal(numberResult, 55, "should return '55' on TS.Linq.Enumerator<number> .");
    });

    test("Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerator<string>.", () => 
    {
      stringResult = TS.Linq.Extensions.aggregate(createStringArray(), (first, second) =>
      {
        return first + ", " + second;
      });
      assert.equal(stringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerator<string> .");
    });

    test("Should return 595 on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'horsePower' and a seed value of '0'.", () => 
    {
      carNumberResult = TS.Linq.Extensions.aggregate(createCarsArray(), (first: number, second: DATA.DATA.Car) => first + second.horsePower, 0);
      assert.equal(carNumberResult, 595, "Should return 595 on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'horsePower' and a seed value of '0'.");
    });

    test("Should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'name' and a seed value of \"\".", () => 
    {
      carStringResult = TS.Linq.Extensions.aggregate(createCarsArray(), (first: string, second: DATA.DATA.Car) => first + second.name, "");
      assert.equal(carStringResult, "BMWAUDIVWFIATTRABANT", "Should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'name' and a seed value of \"\".");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.", () => 
    {
      //Empty enumerator
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate<string>(TS.Linq.Enumerator.Empty, (first, second) => { return first + second; });
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => 
    {
      //Null enumerator
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate<string>(null, (first, second) => { return first + second; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => 
    {
      //Undefined enumerator
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate<string>(undefined, (first, second) => { return first + second; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.", () => 
    {
      //Null accumulator
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate(createStringArray(), null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.", () => 
    {
      //Undefined accumulator
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate(createStringArray(), undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.");
    });

  });


  suite("all", () =>
  {
    let testResult: boolean;

    test("Should return true for an empty enumerator.", () => 
    {
      assert.equal(TS.Linq.Extensions.all(TS.Linq.Enumerator.Empty, (item) => false), true, "Should return true for an empty enumerator.");
    });

    test("Should return true on a predicate that should pass.", () => 
    {
      testResult = TS.Linq.Extensions.all<string>(createStringArray(), (item) => item.length >= 3);
      assert.ok(testResult, "Should return true on a predicate that should pass.");
    });

    test("Should return false on a predicate that shouldn't pass.", () => 
    {
      testResult = TS.Linq.Extensions.all<string>(createStringArray(), (item) => item.length > 4);
      assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all<string>(null, (item) => item.length < 0);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all<string>(createStringArray(), null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all<string>(undefined, (item) => item.length < 0);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all<string>(createStringArray(), undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
    });

  });


  suite("any", () => 
  {
    let testResult: boolean;

    test("Should return false on an empty 'enumerator'.", () => 
    {
      assert.equal(TS.Linq.Extensions.any(TS.Linq.Enumerator.Empty, (item) => true), false, "Should return false on an empty 'enumerator'.");
    });

    test("Should return true on a predicate that should pass.", () => 
    {
      testResult = TS.Linq.Extensions.any(createStringArray(), (item) => item.length >= 3);
      assert.ok(testResult, "Should return true on a predicate that should pass.");
    });

    test("Should return false on a predicate that shouldn't pass.", () => 
    {
      testResult = TS.Linq.Extensions.any(createStringArray(), (item) => item.length < 2);
      assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");
    });

    test("Should return true on a none empty 'enumerable' without predicate.", () => 
    {
      testResult = TS.Linq.Extensions.any(createStringArray());
      assert.ok(testResult, "Should return true on a none empty 'enumerable' without predicate.");
    });

    test("Should return false on an empty 'enumerable' without predicate.", () => 
    {
      testResult = TS.Linq.Extensions.any(TS.Linq.Enumerator.Empty);
      assert.ok(!testResult, "Should return false on an empty 'enumerable' without predicate.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.any<string>(null, (item) => item.length < 0);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.any<string>(undefined, (item) => item.length < 0);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("average", () =>
  {
    let testNumberArray: Array<number>;
    let testResult: number;

    test("Should return the expected average.", () =>
    {
      testNumberArray = createNumberArray();
      testResult = TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>(testNumberArray));
      assert.equal(testResult, 5.5, "Should return the expected average.");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>([]));
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.average(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.average(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.OverflowException\" for an 'Enumerator<number>' which elements sum exceedes the number range.", () =>
    {
      testNumberArray.push(Number.MAX_VALUE / 2);
      testNumberArray.push(Number.MAX_VALUE);

      assert.throws(() =>
      {
        TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>(testNumberArray));
      }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an 'Enumerator<number>' which elements sum exceedes the number range.");
    });

  });


  suite("concat", () =>
  {
    let concatenatedNumberEnumerator: TS.Linq.Enumerator<number>;
    let concatenatedStringEnumerator: TS.Linq.Enumerator<string>;
    let numberArray: Array<number>;
    let stringArray: Array<string>;
    let compareNumberArray: Array<number>;

    test("Should return the expected result of the concatenation.", () =>
    {
      concatenatedNumberEnumerator = TS.Linq.Extensions.concat<number>(new TS.Linq.Enumerator<number>(createNumberArray()), new TS.Linq.Enumerator<number>(createNumberArray()));
      numberArray = TS.Linq.Extensions.toArray(concatenatedNumberEnumerator);
      assert.deepEqual(numberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return the expected result of the concatenation.");
    });

    test("Should return the expected result of the concatenation.", () =>
    {
      concatenatedStringEnumerator = TS.Linq.Extensions.concat<string>(new TS.Linq.Enumerator<string>(createStringArray()), new TS.Linq.Enumerator<string>(createStringArray()));
      stringArray = TS.Linq.Extensions.toArray(concatenatedStringEnumerator);
      assert.deepEqual(stringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return the expected result of the concatenation.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat(null, new TS.Linq.Enumerator(createStringArray()));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat(new TS.Linq.Enumerator(createStringArray()), null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat(undefined, new TS.Linq.Enumerator(createStringArray()));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat(new TS.Linq.Enumerator(createStringArray()), undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
    });

  });


  suite("contains", () =>
  {
    let testResult: boolean;
    let emptyEnumerator: TS.Linq.Enumerator<any>;
    let testCar: DATA.DATA.ICar

    testCar = new DATA.DATA.Car("SCODA");

    emptyEnumerator = new TS.Linq.Enumerator<any>([]);

    test("Should return the expected result of the contains function.", () =>
    {
      testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(createNumberArray()), 5);
      assert.ok(testResult, "Should return the expected result of the contains function.");
    });

    test("Should return the expected result of the contains function.", () =>
    {
      testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(createNumberArray()), 11);
      assert.ok(!testResult, "Should return the expected result of the contains function.");
    });

    test("Should return the expected result of the contains function.", () =>
    {
      testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(createStringArray()), "five");
      assert.ok(testResult, "Should return the expected result of the contains function.");
    });

    test("Should return the expected result of the contains function.", () =>
    {
      testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(createStringArray()), "eleven");
      assert.ok(!testResult, "Should return the expected result of the contains function.");
    });

    test("Should return the expected result of the contains function.", () =>
    {
      testResult = TS.Linq.Extensions.contains(emptyEnumerator, 123);
      assert.ok(!testResult, "Should return the expected result of the contains function.");
    });

    test("Should return the expected result of the contains function which uses an equality comparer.", () =>
    {
      testResult = TS.Linq.Extensions.contains<DATA.DATA.ICar>(new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray()), createCarsArray()[3], (first: DATA.DATA.ICar, second: DATA.DATA.ICar) => first.name == second.name);
      assert.ok(testResult, "Should return the expected result of the contains function which uses an equality comparer.");
    });

    test("Should return the expected result of the contains function which uses an equality comparer.", () =>
    {
      testResult = TS.Linq.Extensions.contains<DATA.DATA.ICar>(new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray()), testCar, (first: DATA.DATA.ICar, second: DATA.DATA.ICar) => first.name == second.name);
      assert.ok(!testResult, "Should return the expected result of the contains function which uses an equality comparer.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.contains(null, 123);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'element' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.contains(emptyEnumerator, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'element' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.contains(undefined, 123);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.contains(emptyEnumerator, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");
    });

  });


  suite("count", () =>
  {
    let numberEnumerator: TS.Linq.Enumerator<number>;
    let stringEnumerator: TS.Linq.Enumerator<string>;
    let carEnumerator: TS.Linq.Enumerator<DATA.DATA.ICar>;

    test("Should count 10 numbers out of 10.", () => 
    {
      numberEnumerator = new TS.Linq.Enumerator<number>(createNumberArray());
      assert.equal(TS.Linq.Extensions.count(numberEnumerator), 10, "Should count 10 numbers out of 10.");
    });

    test("Should count 5 numbers greater 5 out of 10.", () =>
    {
      numberEnumerator = new TS.Linq.Enumerator<number>(createNumberArray());
      assert.equal(TS.Linq.Extensions.count(numberEnumerator, (item) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
    });

    test("Should counted 0 on an empty enumerator.", () =>
    {
      assert.equal(TS.Linq.Extensions.count(new TS.Linq.Enumerator([])), 0, "Should counted 0 on an empty enumerator.");
    });

    test("Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.", () =>
    {
      stringEnumerator = new TS.Linq.Enumerator<string>(createStringArray());
      assert.equal(TS.Linq.Extensions.count(stringEnumerator, (item) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
    });

    test("Should count 4 elements with horsePower greater 100 in an 'Enumerator<TDATA.Car>' using a predicate.", () =>
    {
      carEnumerator = new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray());
      assert.equal(TS.Linq.Extensions.count(carEnumerator, (item) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerator<TDATA.Car>' using a predicate.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.count(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.count(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("cycle", () =>
  {
    let stringEnumerator: Iterable<string>;
    let resultEnumerator: Iterable<string>;
    let resultArray: Array<string>;

    test("Should return 40 elements after a call to 'take(40)'.", () =>
    {
      stringEnumerator = new TS.Linq.Enumerator<string>(createStringArray());
      resultEnumerator = TS.Linq.Extensions.take(TS.Linq.Extensions.cycle(stringEnumerator), 40);
      resultArray = TS.Linq.Extensions.toArray(resultEnumerator);
      assert.equal(resultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");
    });

    test("Should return an empty enumerator if the argument 'enumerator' was also an empty enumerator.", () =>
    {
      resultEnumerator = TS.Linq.Extensions.take<string>(TS.Linq.Extensions.cycle<string>(new TS.Linq.Enumerator<string>([])), 20);
      resultArray = TS.Linq.Extensions.toArray(resultEnumerator);
      assert.equal(resultArray.length, 0, "Should return an empty enumerator if the argument 'enumerator' was also an empty enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.cycle(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.cycle(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("defaultIfEmpty", () =>
  {
    let carEnumerator: Iterable<DATA.DATA.ICar>;
    let numEnumerator: Iterable<number>;
    let resultCarArray: Array<DATA.DATA.ICar>;
    let resultNumArray: Array<number>;

    test("Should return an enumerator with one default object element if called with an empty enumerator.", () => 
    {
      carEnumerator = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Enumerator.Empty, DATA.DATA.Car);
      resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
      assert.deepEqual(resultCarArray[0], new DATA.DATA.Car(), "Should return an enumerator with one default object element if called with an empty enumerator.");
    });


    test("Should return the original enumerator if called with a none empty enumerator.", () => 
    {
      carEnumerator = TS.Linq.Extensions.defaultIfEmpty<DATA.DATA.ICar>(new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray()), DATA.DATA.Car);
      resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
      assert.deepEqual(resultCarArray, createCarsArray(), "Should return the original enumerator if called with a none empty enumerator.");
    });

    test("Should return an enumerator with one default primitive value element if called with an empty enumerator.", () => 
    {
      numEnumerator = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Enumerator.Empty, 1);
      resultNumArray = TS.Linq.Extensions.toArray(numEnumerator);
      assert.deepEqual(resultNumArray, [1], "Should return an enumerator with one default primitive value element if called with an empty enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.defaultIfEmpty(null, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.defaultIfEmpty(new TS.Linq.Enumerator<DATA.DATA.ICar>([]), null)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.defaultIfEmpty(undefined, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.defaultIfEmpty(new TS.Linq.Enumerator<DATA.DATA.ICar>([]), undefined)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
    });

  });


  suite("distinct", () =>
  {
    let doubleCarArray: Array<DATA.DATA.ICar>;
    let carEnumerator: Iterable<DATA.DATA.ICar>;
    let resultCarArray: Array<DATA.DATA.ICar>;
    let numberArray: Array<number>;

    test("Should return an enumerator with the expected elements.", () => 
    {
      doubleCarArray = createCarsArray().concat(createCarsArray());
      carEnumerator = TS.Linq.Extensions.distinct<DATA.DATA.ICar>(new TS.Linq.Enumerator<DATA.DATA.ICar>(doubleCarArray), (first: DATA.DATA.ICar, second: DATA.DATA.ICar) => first.name == second.name);
      resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
      assert.deepEqual(resultCarArray, createCarsArray(), "Should return an enumerator with the expected elements.");
    });

    test("Should return an enumerator with the expected elements.", () => 
    {
      numberArray = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(new TS.Linq.Enumerator<number>([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9])));
      assert.equal(numberArray.length, 10, "Should return an enumerator with the expected elements.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.distinct(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => 
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.distinct(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("elementAt", () =>
  {
    let carEnumerator: TS.Linq.Enumerator<DATA.DATA.ICar>;
    let resultCar: DATA.DATA.ICar;

    test("Should return the element at the required position.", () => 
    {
      carEnumerator = new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray());
      resultCar = TS.Linq.Extensions.elementAt(carEnumerator, 3);
      assert.deepEqual(resultCar, createCarsArray()[3], "Should return the element at the required position.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(carEnumerator, -3);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(carEnumerator, 3.5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
    });

    test("The call should fail with a \"TS.IndexOutOfRangeException\" for an invalid 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(carEnumerator, 20);
      }, TS.IndexOutOfRangeException, "The call should fail with a \"TS.IndexOutOfRangeException\" for an invalid 'index' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(null, 20);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(carEnumerator, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(undefined, 20);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAt(carEnumerator, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
    });

  });


  suite("elementAtOrDefault", () =>
  {
    let carEnumerator: TS.Linq.Enumerator<DATA.DATA.ICar>;
    let resultCar: DATA.DATA.ICar;

    test("Should return the element at the required position.", () => 
    {
      carEnumerator = new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray());
      resultCar = TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 3, DATA.DATA.Car);
      assert.deepEqual(resultCar, createCarsArray()[3], "Should return the element at the required position.");
    });

    test("Should return a default element for a required position out of the range of the enumerator.", () =>
    {
      resultCar = TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, DATA.DATA.Car);
      assert.deepEqual(resultCar, new DATA.DATA.Car(), "Should return a default element for a required position out of the range of the enumerator.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnumerator, -3, DATA.DATA.Car);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");;
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(null, 20, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnumerator, null, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(undefined, 20, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnumerator, undefined, DATA.DATA.Car);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
    });

  });


  suite("empty", () =>
  {
    let emptyCarEnumerator: TS.Linq.Enumerator<DATA.DATA.Car>;

    test("Should create an iterable object.", () => 
    {
      emptyCarEnumerator = new TS.Linq.Enumerator<DATA.DATA.Car>(new Array<DATA.DATA.Car>());
      assert.ok(TS.Utils.Assert.isIterable(emptyCarEnumerator), "Should create an iterable object.");
    });

    test("The created enumerator should have 0 elements.", () => 
    {
      emptyCarEnumerator = new TS.Linq.Enumerator<DATA.DATA.Car>(new Array<DATA.DATA.Car>());
      assert.ok(TS.Linq.Extensions.count(emptyCarEnumerator) == 0, "The created enumerator should have 0 elements.");
    });

  });


  suite("except", () =>
  {
    let lowNumEnum: Iterable<number>;
    let higNumEnum: Iterable<number>;
    let resultEnum: Iterable<number>;
    let resultArray: Array<number>;
    let carEnum: Iterable<DATA.DATA.Car>;
    let carResultEnum: Iterable<DATA.DATA.Car>;
    let carResultArray: Array<DATA.DATA.Car>;

    test("Should return a result set with 3 elements.", () => 
    {
      lowNumEnum = new TS.Linq.Enumerator<number>([1, 2, 3, 4, 5, 6]);
      higNumEnum = new TS.Linq.Enumerator<number>([4, 5, 6, 7, 8, 9]);
      resultEnum = TS.Linq.Extensions.except(lowNumEnum, higNumEnum);
      resultArray = TS.Linq.Extensions.toArray(resultEnum);
      assert.deepEqual(resultArray, [1, 2, 3], "Should return a result set with 3 elements.");
    });

    test("Should return a result set with 4 elements.", () =>
    {
      lowNumEnum = new TS.Linq.Enumerator<number>([1, 2, 3, 4, 5, 6]);
      resultEnum = TS.Linq.Extensions.except(lowNumEnum, new TS.Linq.Enumerator<number>([1, 2]));
      resultArray = TS.Linq.Extensions.toArray(resultEnum);
      assert.deepEqual(resultArray, [3, 4, 5, 6], "Should return a result set with 4 elements.");
    });

    test("Should return a result set with 4 elements.", () =>
    {
      lowNumEnum = new TS.Linq.Enumerator<number>([1, 2, 3, 4, 5, 6]);
      resultEnum = TS.Linq.Extensions.except(lowNumEnum, new TS.Linq.Enumerator<number>([2, 5]));
      resultArray = TS.Linq.Extensions.toArray(resultEnum);
      assert.deepEqual(resultArray, [1, 3, 4, 6], "Should return a result set with 4 elements.");
    });

    test("Should return a result set with 3 elements.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>([
        new DATA.DATA.Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000),
        new DATA.DATA.Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000),
        new DATA.DATA.Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000),
        new DATA.DATA.Car("FIAT", 60, false, Date.parse("1980-01-01"), 500)
      ]);

      carResultEnum = TS.Linq.Extensions.except<DATA.DATA.Car>(new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray()), carEnum, (first, second) => first.name == second.name);
      carResultArray = TS.Linq.Extensions.toArray(carResultEnum);
      assert.equal(carResultArray.length, 3, "Should return a result set with 3 elements.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.except(null, TS.Linq.Enumerator.Empty);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.except(TS.Linq.Enumerator.Empty, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.except(undefined, TS.Linq.Enumerator.Empty);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.except(TS.Linq.Enumerator.Empty, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerable' argument.");
    });
  });


  suite("first", () =>
  {
    let result: DATA.DATA.IPerson;

    test("Should return the first match in the result set.", () =>
    {
      result = TS.Linq.Extensions.first(persEnum);
      assert.equal(result.LastName, "Sánchez", "Should return the first match in the result set.");
    });

    test("Should return the first match in the result set when called with a predicate.", () =>
    {
      result = TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Michael");
      assert.equal(result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for call with no match.", () =>
    {
      assert.throws(() =>
      {
        result = TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Snow-white");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for call with no match.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for an empty enumerator.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.first(TS.Linq.Enumerator.Empty);
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty enumerator.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for an invalid predicate.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.first(persEnum, (item: any) => item.NoAttribute == "NOP");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an invalid predicate.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for a call with an empty 'enumerator' and a 'predicate'.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.first(TS.Linq.Enumerator.Empty, (item: number) => item.toString() == "5");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a call with an empty 'enumerator' and a 'predicate'.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.first(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.first(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("firstOrDefault", () =>
  {
    let result: any;
    let carEnum: TS.Linq.Enumerator<DATA.DATA.Car>;


    test("Should return the first match in the result set.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());
      result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car);
      assert.equal(result.name, "BMW", "Should return the first match in the result set.");
    });

    test("Should return a default object for a call with a predicate with no match.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());
      result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "faöejrfkesjköpaf")
      assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a predicate with no match.");
    });

    test("Should return the first match in the result set when called with a matching predicate.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());
      result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "AUDI");
      assert.equal(result.name, "AUDI", "Should return the first match in the result set when called with a matching predicate.");
    });

    test("Should return a default object for a call with a predicate with no match.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());
      result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "faöejrfkesjköpaf");
      assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a predicate with no match.");
    });

    test("Should return a default object for a call with a invalid predicate.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());
      result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item: any) => item.noValidAttribute == 5);
      assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a invalid predicate.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.firstOrDefault(null, DATA.DATA.Car, (item) => true);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.firstOrDefault(TS.Linq.Enumerator.Empty, null, (item) => true);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.firstOrDefault(undefined, DATA.DATA.Car, (item) => true);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.firstOrDefault(TS.Linq.Enumerator.Empty, undefined, (item) => true);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
    });

  });


  suite("foreach", () => 
  {
    var passed: boolean;
    let carEnum: Iterable<DATA.DATA.Car>;

    test("Should return an enumeration with the expected changes on each element.", () =>
    {
      carEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray().concat(createCarsUnionTestArray()));
      carEnum = TS.Linq.Extensions.forEach(carEnum, (item) => item.horsePower = 12);
      passed = true;

      for (let item of carEnum)
      {
        if (item.horsePower != 12)
        {
          passed = false;
        }
      }

      assert.ok(passed, "Should return an enumeration with the expected changes on each element.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach(null, item => { });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach(undefined, item => { });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'action' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach(carEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'action' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'action' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach(carEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'action' argument.");
    });

  });


  suite("groupBy", () =>
  {
    let resultCustomerEnum: TS.Linq.Enumerator<TS.Linq.Grouping<string, DATA.DATA.ICustomer>>;
    let resultProductEnum: TS.Linq.Enumerator<TS.Linq.Grouping<string, DATA.DATA.IProduct>>;
    let resultProductEnumStorageRoom: TS.Linq.Enumerator<TS.Linq.Grouping<string, string>>;
    let resultProductEnumerableStorageRoomConcat: TS.Linq.Enumerator<{ Key: string; RoomConcat: string }>;

    test("Should return 21 elements for the executed expression.", () =>
    {
      resultCustomerEnum = TS.Linq.Extensions.groupBy(custEnum, _CUST => _CUST.Country);
      assert.equal(TS.Linq.Extensions.count(resultCustomerEnum), 21, "Should return 21 elements for the executed expression.");
    });

    test("Should return 5 elements for the executed expression with equalityComparer.", () =>
    {
      let resProArr = createProductArray()

      resultProductEnum = TS.Linq.Extensions.groupBy(new TS.Linq.Enumerator<DATA.DATA.IProduct>(resProArr), item => TS.Utils.findSingleCurrency(item.Currency).Code);
      assert.equal(TS.Linq.Extensions.count(resultProductEnum), 5, "Should return 5 elements for the executed expression with equalityComparer.");
    });

    //for (let outerItem of resultProductEnum)
    //{
    //  console.log(JSON.stringify(outerItem));
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}

    test("Should return 5 elements for the executed expression with elementSelector.", () =>
    {
      function equComp(first: string, second: string): boolean
      {
        return TS.Utils.findSingleCurrency(first).Code === TS.Utils.findSingleCurrency(second).Code
      }

      let resProArr = createProductArray()
      resultProductEnumStorageRoom = TS.Linq.Extensions.groupBy(new TS.Linq.Enumerator<DATA.DATA.IProduct>(resProArr), item => TS.Utils.findSingleCurrency(item.Currency).Code, equComp, (item) => item.Storage.Room);
      assert.equal(TS.Linq.Extensions.count(resultProductEnumStorageRoom), 5, "Should return 5 elements for the executed expression with elementSelector.");
    });

    //for (let outerItem of resultProductEnumStorageRoom)
    //{
    //  console.log(JSON.stringify(outerItem));
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(null, _CUST => _CUST);;
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(undefined, _CUST => _CUST);;
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(TS.Linq.Enumerator.Empty, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.");
    });
    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(TS.Linq.Enumerator.Empty, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.");
    });

  });


  suite("groupJoin", () =>
  {
    let jointEnum: Iterable<any>;
    let ordersCount: number;

    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
    //The query will return 91 Results.

    test("Should return 91 elements for the executed expression.", () =>
    {
      jointEnum = TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }));
      assert.equal(TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");

      ordersCount = 0;
      for (let item of jointEnum)
      {
        //console.log("***************************************************");
        //console.log(JSON.stringify(item));
        //console.log("***************************************************");

        for (let order of item.OrderGroup)
        {
          ordersCount++;
          //console.log("  " + JSON.stringify(order));
        }
      }
      //console.log("Total orders: " + ordersCount);
      assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");
    });

    //
    //Call the query once again but using the 'equalityComparer' instead of the default comparer.
    //Should return the same result.
    //
    test("Should return 830 order records for the executed expression.", () =>
    {
      jointEnum = TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey: string, innerKey: string) => outerKey == innerKey);
      assert.equal(TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");

      ordersCount = 0;
      for (let item of jointEnum)
      {
        //console.log("***************************************************");
        //console.log(JSON.stringify(item));
        //console.log("***************************************************");
        for (let order of item.OrderGroup)
        {
          ordersCount++;
          //console.log("  " + JSON.stringify(order));
        }
      }

      assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
    });

  });


  suite("intersect", () => 
  {
    let carsUnionEnum: Iterable<DATA.DATA.Car>;
    let carsEnum: Iterable<DATA.DATA.Car>;
    let carsIntersect: Iterable<DATA.DATA.Car>;
    let numberEnumFirst: Iterable<number>;
    let numberEnumSecond: Iterable<number>;
    let numberIntersect: Iterable<number>;

    test("Schould return a result set with 2 elements when called with an equality comparer.", () =>
    {
      carsUnionEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsUnionTestArray());
      carsEnum = new TS.Linq.Enumerator<DATA.DATA.Car>(createCarsArray());

      carsIntersect = TS.Linq.Extensions.intersect(carsEnum, carsUnionEnum, (first, second) => first.name === second.name);

      assert.equal(TS.Linq.Extensions.count(carsIntersect), 2, "Schould return a result set with 2 elements when called with an equality comparer.");
    });

    test("Schould return a result set with 4 elements when called without an equality comparer.", () =>
    {
      numberEnumFirst = new TS.Linq.Enumerator<number>(createNumberArray());
      numberEnumSecond = new TS.Linq.Enumerator<number>([2, 4, 7, 8]);
      numberIntersect = TS.Linq.Extensions.intersect(numberEnumFirst, numberEnumSecond);

      assert.equal(TS.Linq.Extensions.count(numberIntersect), 4, "Schould return a result set with 4 elements when called without an equality comparer.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(null, numberEnumSecond);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(undefined, numberEnumSecond);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(numberEnumFirst, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(numberEnumFirst, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
    });

  });


  suite("join", () =>
  {
    let jointEnum: TS.Linq.Enumerator<any>;


    test("Should return 830 records for the executed expression.", () =>
    {
      jointEnum = TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
      assert.equal(TS.Linq.Extensions.count(jointEnum), 830, "Should return 830 records for the executed expression.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
    });
  });


  suite("last", () =>
  {
    let result: DATA.DATA.IPerson;

    test("Should return the last element in the result set.", () =>
    {
      result = TS.Linq.Extensions.last(persEnum);
      assert.equal(result.LastName, "Cox", "Should return the last element in the result set.");
    });

    test("Should return the last match in the result set when called with a predicate.", () =>
    {
      result = TS.Linq.Extensions.last(persEnum, (item) => item.FirstName == "Michael");
      assert.equal(result.LastName, "Martin", "Should return the last match in the result set when called with a predicate.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.last(TS.Linq.Enumerator.Empty);
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" when called with a predicate that doesn't match.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.last(persEnum, (item: any) => item.NoAttribute == "NOP");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" when called with a predicate that doesn't match.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator when called with a predicate.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.last(TS.Linq.Enumerator.Empty, (item: number) => item.toString() == "5");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator when called with a predicate.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.last(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.last(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("lastOrDefault", () =>
  {
    let result: DATA.DATA.ICustomer;

    test("Should return the last element in the enumerable.", () =>
    {
      result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer);
      assert.equal(result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");
    });

    test("Should return a default object if the enumerable is empyt.", () =>
    {
      result = TS.Linq.Extensions.lastOrDefault(TS.Linq.Enumerator.Empty, DATA.DATA.Customer);
      assert.deepEqual(result, new DATA.DATA.Customer(), "Should return a default object if the enumerable is empyt.");
    });

    test("Should return the last match in the result set when called with a predicate.", () =>
    {
      result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer, (Item) => Item.Country == "USA");
      assert.equal(result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate.");
    });

    test("Should return a default object when called with a predicate that doesn't match.", () =>
    {
      result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer, (Item) => Item.Country == "NOP");
      assert.deepEqual(result, new DATA.DATA.Customer(), "Should return a default object when called with a predicate that doesn't match.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.lastOrDefault(null, DATA.DATA.Customer);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.lastOrDefault(undefined, DATA.DATA.Customer);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.lastOrDefault(custEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.lastOrDefault(custEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
    });

    //assert.ok(false, "Not implemented.");
  });


  suite("max", () =>
  {
    let max: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Max().Dump();
    //The query will return 1007.6400

    test("Should return the expected value.", () =>
    {
      max = TS.Linq.Extensions.max(TS.Linq.Extensions.select(ordEnum, (_ORD => _ORD.Freight)));
      assert.equal(max, 1007.64, "Should return the expected value.");
    });

    test("Should return the expected value.", () =>
    {
      max = TS.Linq.Extensions.max(new TS.Linq.Enumerator<number>(createNumberArray()));
      assert.equal(max, 10, "Should return the expected value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.max(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.max(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for a empty 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.max(TS.Linq.Enumerator.Empty);
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for a empty 'enumerator' argument.");
    });
  });


  suite("min", () =>
  {
    let min: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Min().Dump();
    //The query will return 0.0200

    test("Should return the expected value.", () =>
    {
      min = TS.Linq.Extensions.min(TS.Linq.Extensions.select(ordEnum, _ORD => _ORD.Freight));
      assert.equal(min, 0.02, "Should return the expected value.");
    });

    test("Should return the expected value.", () =>
    {
      min = TS.Linq.Extensions.min(new TS.Linq.Enumerator<number>(createNumberArray()));
      assert.equal(min, 1, "Should return the expected value.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.min(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.min(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumeratorExceptio\" for a empty 'enumerable' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.min(TS.Linq.Enumerator.Empty);
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptio\" for a empty 'enumerable' argument.");
    });
  });


  suite("orderBy", () =>
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<any, any>;
    let orderCorrect: boolean;
    let index: number;
    let partIter: Iterator<Iterator<any>>;
    let partIterResult: IteratorResult<Iterator<any>>;
    let partCount = 0;
    let lastItem = "";
    let lastItemColor = "";
    let lastItemCountry = "";
    let lastNumber = 0;

    test("The orderedEnumerator items should be sorted by color in ascending order.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.orderBy(new TS.Linq.Enumerator<DATA.DATA.ISortTestItem>(createSortTestArray()), (item) => item.color);

      orderCorrect = true;
      lastItemColor = "";

      for (let item of orderedEnumerator)
      {
        if (item.color < lastItemColor)
        {
          orderCorrect = false;
        }
        lastItemColor = item.color;
      }//END for

      assert.ok(orderCorrect, "The orderedEnumerator items should be sorted by color in ascending order.");
    });

    test("The orderedEnumerator should hold three partitions for the different colors found during last sort.", () =>
    {
      partIter = orderedEnumerator.partitionIterator();
      partCount = 0;

      partIterResult = partIter.next();
      while (!partIterResult.done)
      {
        partCount++;
        partIterResult = partIter.next();
      }

      assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");
    });

    test("Should returns an array of numbers sorted in ascending order.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.orderBy<number, number>(new TS.Linq.Enumerator<number>(createRandomNumberArray(100)), (item) => item);

      orderCorrect = true;
      lastNumber = 0;

      for (let item of orderedEnumerator)
      {
        if (item < lastNumber)
        {
          orderCorrect = false;
        }
        lastNumber = item;
      }//END for

      assert.ok(orderCorrect, "Should returns an array of numbers sorted in ascending order.");
    });

    test("Should returns an array of customers sorted by country in ascending order.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.orderBy<DATA.DATA.Customer, string>(custEnum, item => item.Country, (first, second) => first.localeCompare(second));

      lastItemCountry = "";
      for (let item of orderedEnumerator)
      {
        if (item.Country < lastItemCountry)
        {
          orderCorrect = false;
        }
        lastItemCountry = item.Country;
      }//END for

      assert.ok(orderCorrect, "Should returns an array of customers sorted by country in ascending order.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(null, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(undefined, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(TS.Linq.Enumerator.Empty, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(TS.Linq.Enumerator.Empty, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
    });

  });


  suite("orderByDescending", () =>
  {
    let sortTestEnum: TS.Linq.Enumerator<DATA.DATA.ISortTestItem>;
    let randomNumberEnum: TS.Linq.Enumerator<number>;
    let resultSortTestEnum: TS.Linq.OrderedEnumerator<DATA.DATA.ISortTestItem, string>;
    let resultNumberEnum: TS.Linq.OrderedEnumerator<number, number>;
    let resultCustomersEnum: TS.Linq.OrderedEnumerator<DATA.DATA.ICustomer, string>;
    let orderCorrect: boolean;

    test("The array of ISortTestItems should be sorted by color in descending order.", () =>
    {
      sortTestEnum = new TS.Linq.Enumerator<DATA.DATA.ISortTestItem>(createSortTestArray());
      resultSortTestEnum = TS.Linq.Extensions.orderByDescending(sortTestEnum, (item) => item.color);

      orderCorrect = true;
      let lastColor: string = null;

      for (let item of resultSortTestEnum)
      {
        if (lastColor != null)
        {
          if (lastColor < item.color)
          {
            orderCorrect = false;
          }
          lastColor = item.color;
        }
      }

      assert.ok(orderCorrect, "The array of ISortTestItems should be sorted by color in descending order.");
    });

    test("Should returns an array of numbers sorted in descending order.", () =>
    {
      randomNumberEnum = new TS.Linq.Enumerator<number>(createRandomNumberArray(100));
      resultNumberEnum = TS.Linq.Extensions.orderByDescending(randomNumberEnum, item => item);

      orderCorrect = true;
      let lastNumber: number = null;

      for (let item of resultNumberEnum)
      {
        if (lastNumber != null)
        {
          if (lastNumber < item)
          {
            orderCorrect = false;
          }
          lastNumber = item;
        }
      }

      assert.ok(orderCorrect, "Should returns an array of numbers sorted in descending order.");
    });

    test("Should return an array sorted by country in descending order using the specified key and comparer.", () =>
    {
      resultCustomersEnum = TS.Linq.Extensions.orderByDescending(custEnum, item => item.Country, (first, second) =>
      {
        if (first > second)
        {
          return 1;
        };
        if (first < second)
        {
          return -1;
        };
        return 0;
      });

      let resultString = TS.Linq.Extensions.first(resultCustomersEnum).Country + ", " + TS.Linq.Extensions.last(resultCustomersEnum).Country;

      assert.equal(resultString, "Venezuela, Argentina", "Should return an array sorted by country in descending order using the specified key and comparer.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(null, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(undefined, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(custEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(custEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
    });
  });


  suite("random", () =>
  {
    let stringResultEnum: Iterable<string>;
    let isRandom = false;

    test("Should return a string array in random order.", () =>
    {
      stringResultEnum = TS.Linq.Extensions.take(TS.Linq.Extensions.random(createStringArray()), 50);

      let lastItem: string = null;
      for (let item of stringResultEnum)
      {
        if (lastItem != null)
        {
          if (lastItem != item)
          {
            isRandom = true;
          }
        }
        lastItem = item;
      }

      assert.ok(isRandom, "Should return a string array in random order.");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.first(TS.Linq.Extensions.random(TS.Linq.Enumerator.Empty));
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.random(null)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.random(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
    });
  });


  suite("range", () => 
  {
    let resultEnum: Iterable<Number>;

    test("Should return an enumerator with 50 elements.", () =>
    {
      resultEnum = TS.Linq.Extensions.range(1, 50);
      assert.equal(TS.Linq.Extensions.count(resultEnum), 50, "Should return an enumerator with 50 elements.");
    });

    test("Should return an enumerable with 0 elements.", () =>
    {
      resultEnum = TS.Linq.Extensions.range(111, 0);
      assert.equal(TS.Linq.Extensions.count(resultEnum), 0, "Should return an enumerable with 0 elements.");
    });

    test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a 'start, count' combination which exceedes the allowed range.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(Number.MAX_SAFE_INTEGER - 2, 5);
      }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a 'start, count' combination which exceedes the allowed range.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer in the range [Number.MIN_SAFE_INTEGER .. Number.MAX_SAFE_INTEGER]", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(Number.MAX_VALUE, 5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer in the range [Number.MIN_SAFE_INTEGER .. Number.MAX_SAFE_INTEGER]");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(5.5, 5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(1, -3);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'start' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(null, 33);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'start' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'start' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(undefined, 33);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'start' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(12, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(12, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.");
    });
  });


  suite("repeat", () =>
  {
    let sourceElement: DATA.DATA.ICar;
    let resultEnum: Iterable<DATA.DATA.ICar>;

    test("Should return a result with as much elements as required and of the same type.", () =>
    {
      sourceElement = createCarsArray()[0];

      resultEnum = TS.Linq.Extensions.repeat(sourceElement, 50);
      assert.ok(TS.Linq.Extensions.count(resultEnum) == 50 && TS.Linq.Extensions.first(resultEnum).name == "BMW" && TS.Linq.Extensions.last(resultEnum).name == "BMW", "Should return a result with as much elements as required and of the same type.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.repeat(undefined, 33);
      }, TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeExceptionn\" for a negative 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.repeat(sourceElement, -33);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeExceptionn\" for a negative 'count' argument.");
    });
  });


  suite("reverse", () =>
  {
    let resultEnum: Iterable<number>;
    let controlArray: Array<number>;
    let isReverse: boolean;


    test("Should return an enumerator in reverse order.", () =>
    {
      controlArray = createNumberArray().reverse();
      resultEnum = TS.Linq.Extensions.reverse(createNumberArray());

      isReverse = true;
      for (let item of resultEnum)
      {
        if (item != controlArray.shift())
        {
          isReverse = false;
          break;
        }//END if
      }//END for

      assert.ok(isReverse, "Should return an enumerator in reverse order.");
    });

    test("Should return an empty enumerator if the input enumerator was also empty.", () =>
    {
      resultEnum = TS.Linq.Extensions.reverse(TS.Linq.Enumerator.Empty);

      assert.equal(TS.Linq.Extensions.count(resultEnum), 0, "Should return an empty enumerator if the input enumerator was also empty.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.reverse(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.reverse(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

  });


  suite("select", () =>
  {
    let resultEnum: TS.Linq.Enumerator<any>;
    let expensiveCount: number;

    test("Should return two expensive cars from the cars enumerable.", () =>
    {
      resultEnum = TS.Linq.Extensions.select(createCarsArray(), item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") }));

      expensiveCount = 0;
      for (let item of resultEnum)
      {
        if (item.expensive == "yes")
        {
          expensiveCount++;
        }//END if
      }//END for

      assert.equal(expensiveCount, 2, "Should return two expensive cars from the cars enumerable.");
    });

    test("The call should fail with a \"TS.Linq.SelectorException\" for a call with an invalid 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.select(resultEnum, item => item.NOP).first();
      }, TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorException\" for a call with an invalid 'selector' argument.")
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.select(null, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.")
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.select(undefined, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.select(resultEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.select(resultEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
    });
  });


  suite("selectMany", () =>
  {
    let resultSelectMany: Iterable<string>;
    let resultSelectManyOrder: Iterable<{ CustomerID: string, OrderID: number }>;

    interface IPetOwner 
    {
      Name: string,
      Pets: Array<string>
    }

    test("Should return the full list of pet names.", () =>
    {
      let petOwners: Array<IPetOwner> = [{ Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
        { Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
        { Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }];

      resultSelectMany = TS.Linq.Extensions.selectMany<IPetOwner, string>(petOwners, owner => owner.Pets);
      assert.equal(TS.Linq.Extensions.count(resultSelectMany), 6, "Should return the full list of pet names.");
    });


    test("The number of elements in the selctMany result and the orders table should match.", () =>
    {
      let result = TS.Linq.Extensions.selectMany(custEnum, customer =>
      {
        return TS.Linq.Extensions.where(ordEnum, order => order.CustomerID == customer.CustomerID);
      });

      assert.equal(TS.Linq.Extensions.count(result), TS.Linq.Extensions.count(ordEnum), "The number of elements in the selctMany result and the orders table should match.");
    });

    test("The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        let tempEnum = new TS.Linq.Enumerator<any>(["", 1]);
        TS.Linq.Extensions.selectMany(tempEnum, item => item.NOP).first();
      }, TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.")
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.selectMany<any, any>(null, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.")
    });

    test("The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.selectMany<any, any>(undefined, item => item);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.selectMany<any, any>(TS.Linq.Enumerator.Empty, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")
    });

    test("The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.selectMany<any, any>(TS.Linq.Enumerator.Empty, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
    });
  });


  suite("sequenceEqual", () =>
  {
    let numArray: Array<Number>;
    let custEnumEx: TS.Linq.Enumerator<DATA.DATA.ICustomer>;
    let custArray: Array<DATA.DATA.ICustomer>;
    let compareResult: boolean;


    test("Should return true when comparing two equal enumerators", () =>
    {
      compareResult = TS.Linq.Extensions.sequenceEqual(createNumberArray(), createNumberArray());
      assert.ok(compareResult, "Should return true when comparing two equal enumerators");
    });

    test("Should return true when comparing two equal enumerators using an equalityComparer", () =>
    {
      compareResult = TS.Linq.Extensions.sequenceEqual(custEnum, custEnum, (first, second) => first.ContactName == second.ContactName);
      assert.ok(compareResult, "Should return true when comparing two equal enumerators using an equalityComparer");
    });

    test("Should return false when comparing two enumerators with different elements usin an equalityComparer", () =>
    {
      custArray = custEnum.toArray();
      custArray[12] = new DATA.DATA.Customer("", "", "", "No contact name");
      custEnumEx = new TS.Linq.Enumerator<DATA.DATA.ICustomer>(custArray);
      compareResult = TS.Linq.Extensions.sequenceEqual(custEnum, custEnumEx, (first, second) => first.ContactName == second.ContactName);
      assert.ok(!compareResult, "Should return false when comparing two enumerators with different elements usin an equalityComparer");
    });

    test("Should return false when comparing two enumerators with different length", () =>
    {
      numArray = createNumberArray();
      numArray.push(99);
      compareResult = TS.Linq.Extensions.sequenceEqual(createNumberArray(), numArray);
      assert.ok(!compareResult, "Should return false when comparing two enumerators with different length");
    });


    test("Should return false when comparing two unequal enumerators", () =>
    {
      numArray = createNumberArray()
      numArray[5] = Math.PI;
      compareResult = TS.Linq.Extensions.sequenceEqual(createNumberArray(), numArray);
      assert.ok(!compareResult, "Should return false when comparing two unequal enumerators");
    });


    test("Should return true when comparing two empty enumerators", () =>
    {
      compareResult = TS.Linq.Extensions.sequenceEqual(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty);
      assert.ok(compareResult, "Should return true when comparing two empty enumerators");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(null, numArray);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(undefined, numArray);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(numArray, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(numArray, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
    });

  });


  suite("shuffle", () =>
  {
    let numEnum: TS.Linq.Enumerator<number>;

    test("Should return a result enumerator with the same length as the source array.", () =>
    {
      numEnum = TS.Linq.Extensions.shuffle(createNumberArray());
      assert.equal(TS.Linq.Extensions.count(numEnum), createNumberArray().length, "Should return a result enumerator with the same length as the source array.");
    });

    test("Should return a shuffled enumerator which doesn't be equal to the source enumerator", () =>
    {
      numEnum = TS.Linq.Extensions.shuffle(createNumberArray());
      assert.notDeepEqual(TS.Linq.Extensions.toArray(numEnum), createNumberArray(), "Should return a shuffled enumerator which doesn't be equal to the source enumerator");
    });

    test("A shuffeled empty enumerator should still be an empty enumerator.", () =>
    {
      assert.deepEqual(TS.Linq.Extensions.shuffle(TS.Linq.Enumerator.Empty).toArray(), [], "A shuffeled empty enumerator should still be an empty enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.shuffle(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.shuffle(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("single", () =>
  {
    let result: DATA.DATA.ICustomer;

    test("Should return the expected single result.", () =>
    {
      result = TS.Linq.Extensions.single(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"));
      assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
    });

    test("Should return the expected single result.", () =>
    {
      result = TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID == "OTTIK");
      assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
    });

    test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an 'enumerator' argument with more than one element.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1));
      }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an 'enumerator' argument with more than one element.");
    });

    test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1);
      }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for an empty 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(TS.Linq.Enumerator.Empty);
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which doesn't match.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(TS.Linq.Enumerator.Empty, CUST => CUST.CustomerID == "NOP");
      }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which doesn't match.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.single(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("singleOrDefault", () =>
  {
    let result: DATA.DATA.Customer;

    test("Should return the expected single result.", () =>
    {
      result = TS.Linq.Extensions.singleOrDefault(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"), DATA.DATA.Customer);
      assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
    });

    test("Should return the expected single result.", () =>
    {
      result = TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID == "OTTIK");
      assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
    });

    test("Shoud return a default object for an 'enumerator' which is empty.", () =>
    {
      result = TS.Linq.Extensions.singleOrDefault(TS.Linq.Enumerator.Empty, DATA.DATA.Customer);
      assert.deepEqual(result, new DATA.DATA.Customer(), "Shoud return a default object for an 'enumerator' which is empty.");
    });

    test("Shoud return a default object for a 'predicate' which has no match with the enumerator.", () =>
    {
      result = TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID == "NOP");
      assert.deepEqual(result, new DATA.DATA.Customer(), "Shoud return a default object for a 'predicate' which has no match with the enumerator.");
    });

    test("The call should fail with a \"TS.Linq.MoreThanOneElementException' for an 'enumerator' argument with more than one element.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1), DATA.DATA.Customer);
      }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException' for an 'enumerator' argument with more than one element.");
    });

    test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID.indexOf("BO") > -1);
      }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(null, DATA.DATA.Customer);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(undefined, DATA.DATA.Customer);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(custEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.singleOrDefault(custEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
    });

  });


  suite("skip", () =>
  {
    let numEnum: Iterable<number>;

    test("Should return a result array which matches with the expected array.", () =>
    {
      numEnum = TS.Linq.Extensions.skip(createNumberArray(), 4);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a result array which matches with the expected array.");
    });

    test("Should return an empty result when used on an empty enumerator.", () =>
    {
      numEnum = TS.Linq.Extensions.skip(TS.Linq.Enumerator.Empty, 4);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result when used on an empty enumerator.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skip(createNumberArray(), -5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skip(null, 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skip(undefined, 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("skipWhile", () =>
  {
    let numEnum: Iterable<number>;

    test("Should return a enumerator which holds the expected value.", () =>
    {
      numEnum = TS.Linq.Extensions.skipWhile(createNumberArray(), item => item < 5);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a enumerator which holds the expected value.");
    });

    test("Should return an empty result enumerator when used with a predicate that has no match.", () =>
    {
      numEnum = TS.Linq.Extensions.skipWhile(createNumberArray(), item => item < 20);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with a predicate that has no match.");
    });

    test("Should return an empty result enumerator when used with ab empty source enumerator.", () =>
    {
      numEnum = TS.Linq.Extensions.skipWhile(TS.Linq.Enumerator.Empty, item => true);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with ab empty source enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile(null, (item) => item < 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile(undefined, (item) => item < 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile(createNumberArray(), null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile(createNumberArray(), undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
    });
  });


  suite("sum", () =>
  {
    let result: number;

    test("Should return expected sum.", () =>
    {
      result = TS.Linq.Extensions.sum(createNumberArray());
      assert.equal(result, 55, "Should return expected sum.");
    });

    test("The call should fail with a \"TS.Linq.EmptyEnumerableException\" for an empty 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum(TS.Linq.Enumerator.Empty);
      }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumerableException\" for an empty 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.OverflowException\" for an enumerator which exceeds the number range in sum.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum([(Number.MAX_VALUE / 2), Number.MAX_VALUE]);
      }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an enumerator which exceeds the number range in sum.");
    });

  });


  suite("take", () =>
  {
    let numberEnum: Iterable<number>;

    test("Should return a result array which matches with the expected array.", () =>
    {
      numberEnum = TS.Linq.Extensions.take(createNumberArray(), 4);
      assert.deepEqual(TS.Linq.Extensions.toArray(numberEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.take(createNumberArray(), -5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.take(null, 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.take(undefined, 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("takeWhile", () =>
  {
    let numEnum: Iterable<number>;

    test("Should return a result array which matches with the expected array.", () =>
    {
      numEnum = TS.Linq.Extensions.takeWhile(createNumberArray(), item => item < 5);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");
    });


    test("Should only return alements util the first mismatch.", () =>
    {
      numEnum = TS.Linq.Extensions.takeWhile([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], item => item < 5);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should only return alements util the first mismatch.");
    });

    test("Should return an empty result enumerator for a predicate which has no match.", () =>
    {
      numEnum = TS.Linq.Extensions.takeWhile(createNumberArray(), item => item < -1);
      assert.deepEqual(TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator for a predicate which has no match.");
    });

    test("Should return an empty result enumerator when used against an empt source enumerator.", () =>
    {
      numEnum = TS.Linq.Extensions.takeWhile(TS.Linq.Enumerator.Empty, item => true);
      assert.deepEqual(TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator when used against an empt source enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.takeWhile(null, item => true);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.takeWhile(undefined, item => item < 5);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.takeWhile(createNumberArray(), null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.takeWhile(createNumberArray(), undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
    });
  });


  suite("toArray", () =>
  {
    let numArr: Array<number>;

    test("Should return a result array which matches with the source enumeator.", () =>
    {
      numArr = TS.Linq.Extensions.toArray(numEnum);
      assert.equal(numArr.length, numEnum.count(), "Should return a result array which matches with the source enumeator.");
    });

    test("Should return an empty array for an empty enumeator.", () =>
    {
      numArr = TS.Linq.Extensions.toArray(numEnum);
      assert.equal(TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty).length, 0, "Should return an empty array for an empty enumeator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toArray(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toArray(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("toDictionary", () =>
  {
    let resultDict: TS.Collections.Dictionary<number, DATA.DATA.IPerson>;

    test("Should return a none null result object.", () =>
    {
      resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
      assert.notEqual(resultDict, null, "Should return a none null result object.");
    });

    test("The result collections should have as much elements as the source.", () =>
    {
      resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
      assert.equal(resultDict.count(), persEnum.count(), "The result collections should have as much elements as the source.");
    });

    test("The dictionary should be accessible by key.", () =>
    {
      resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
      assert.equal(resultDict.getItem(10802).value.FirstName, "Katherine", "The dictionary should be accessible by key.");
    });

    test("The dictionary should be accessible by key.", () =>
    {
      resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
      assert.equal(resultDict.getItem(10802).value.LastName, "Jones", "The dictionary should be accessible by key.");
    });


    test("The call should fail with a \"TS.Collections.DuplicateKeyException\" for a key selector function which returns a duplicate key.", () =>
    {
      let doubleElement = persEnum.elementAt(120);
      doubleElement.BusinessEntityID = 10802;
      doubleElement.FirstName = "No first name";
      doubleElement.LastName = "No last name";

      assert.throws(() => 
      {
        let resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
      }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for a key selector function which returns a duplicate key.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toArray(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toArray(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("toList", () =>
  {
    let numList: TS.Collections.List<number>;

    test("Should return a list which has the same length as the original enumerable.", () =>
    {
      numList = TS.Linq.Extensions.toList(numEnum);
      assert.equal(numList.count(), numEnum.count(), "Should return a list which has the same length as the original enumerable.");
    });

    test("Should return an empty list for an empty enumeator.", () =>
    {
      numList = TS.Linq.Extensions.toList(numEnum);
      assert.equal(TS.Linq.Extensions.toList(TS.Linq.Enumerator.Empty).count(), 0, "Should return an empty list for an empty enumeator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.toList(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.toList(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("union", () =>
  {
    let emptyEnum: Iterable<any>;
    let carsEnum: Iterable<DATA.DATA.ICar>;
    let carsEnumResult: Iterable<DATA.DATA.ICar>;
    let carsArrayResult: Array<DATA.DATA.ICar>;
    let numEnum: Iterable<number>;


    test("Should return the expected result when called on numbers array without equality comparer.", () =>
    {
      numEnum = TS.Linq.Extensions.union([5, 3, 9, 7, 5, 9, 3, 7], [8, 3, 6, 4, 4, 9, 1, 0]);
      assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 3, 9, 7, 8, 6, 4, 1, 0], "Should return the expected result when called on numbers array without equality comparer.")
    });

    test("Should return all elements of both test arrays when called without an equality comparer.", () =>
    {
      carsEnumResult = TS.Linq.Extensions.union(createCarsArray(), createCarsUnionTestArray());
      carsArrayResult = TS.Linq.Extensions.toArray(carsEnumResult);
      assert.equal(carsArrayResult.length, 10, "Should return all elements of both test arrays when called without an equality comparer.");
    });

    test("Should return only those elements of both test arrays which are uniqe when called with an equality comparer.", () =>
    {
      carsEnumResult = TS.Linq.Extensions.union(createCarsArray(), createCarsUnionTestArray(), (first, second) => first.name == second.name);
      carsArrayResult = TS.Linq.Extensions.toArray(carsEnumResult);
      assert.equal(carsArrayResult.length, 8, "Should return only those elements of both test arrays which are uniqe when called with an equality comparer.");
    });

    test("Should return an empty enumerator when calle with empty enumerators.", () =>
    {
      emptyEnum = TS.Linq.Extensions.union(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty);
      assert.equal(TS.Linq.Extensions.count(emptyEnum), 0, "Should return an empty enumerator when calle with empty enumerators.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null first 'enumerator' argument.", () =>
    {
      carsEnum = new TS.Linq.Enumerator<DATA.DATA.ICar>(createCarsArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.union(null, carsEnum);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null first 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null second 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.union(carsEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null second 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined first 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.union(undefined, carsEnum);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined first 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.union(carsEnum, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerator' argument.");
    });
  });


  suite("where", () =>
  {
    let resultEnum: Iterable<DATA.DATA.IPerson>;

    test("Should return the expected number of elements for the given query.", () =>
    {
      resultEnum = TS.Linq.Extensions.where<DATA.DATA.IPerson>(persEnum, item => item.FirstName == "Bob");
      assert.equal(TS.Linq.Extensions.count(resultEnum), 1, "Should return the expected number of elements for the given query.");
    });

    test("Should return the expected number of elements for the given query.", () =>
    {
      resultEnum = TS.Linq.Extensions.where<DATA.DATA.IPerson>(persEnum, item => item.FirstName == "Michael");
      assert.equal(TS.Linq.Extensions.count(resultEnum), 5, "Should return the expected number of elements for the given query.");
    });

    test("Should return the expected number of elements for the given query.", () =>
    {
      resultEnum = TS.Linq.Extensions.where<DATA.DATA.IPerson>(persEnum, item => item.FirstName == "Edward");
      assert.equal(TS.Linq.Extensions.count(resultEnum), 3, "Should return the expected number of elements for the given query.");
    });

    test("Should return the expected number of elements for the given query.", () =>
    {
      resultEnum = TS.Linq.Extensions.where<DATA.DATA.IPerson>(persEnum, item => item.FirstName != "");
      assert.equal(TS.Linq.Extensions.count(resultEnum), 400, "Should return the expected number of elements for the given query.");
    });


    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.where(null, (item: any) => item.FirstName != "");
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.where(undefined, (item: any) => item.FirstName != "");
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });


  suite("zip", () => 
  {
    let resultEnum: TS.Linq.Enumerator<any>;

    test("Should return a none empty enumeration.", () =>
    {
      resultEnum = TS.Linq.Extensions.zip(numEnum, custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; });
      assert.notEqual(resultEnum, null, "Should return a none empty enumeration.");
    });

    test("Should returns as much elements as the shorter of both enumerations has.", () =>
    {
      resultEnum = TS.Linq.Extensions.zip(numEnum, custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; });
      assert.equal(resultEnum.count(), numEnum.count(), "Should returns as much elements as the shorter of both enumerations has.");
    });

    test("Should return an enumeration which contains elements of the expected type.", () =>
    {
      let resultElement = TS.Linq.Extensions.first(resultEnum);
      assert.ok((resultElement.number != undefined) && (resultElement.custID != undefined) && (resultElement.custFax != undefined), "Should return an enumeration which contains elements of the expected type.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnum' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(null, custEnum, (num, cust) => { return {}; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnum' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(numEnum, null, (num, cust) => { return {}; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(numEnum, custEnum, null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnum' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(undefined, custEnum, (num, cust) => { return {}; })
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnum' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(numEnum, undefined, (num, cust) => { return {}; })
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.zip(numEnum, custEnum, undefined)
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.");
    });
  });

});
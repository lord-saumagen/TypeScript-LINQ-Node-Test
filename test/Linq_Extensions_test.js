"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
const TS_1 = require('../node_modules/typescript-linq/TS');
const DATA = require('./DATA');
const assert = require('assert');
var custEnum;
var persEnum;
var ordEnum;
var numEnum;
var createStringArray;
var createNumberArray;
var createCarsArray;
var createCarsUnionTestArray;
var createProductArray;
var createSortTestArray;
var createRandomNumberArray;
suite("TS.Linq.Extensions", () => {
    before(function () {
        // runs before all tests in this block
        custEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateCustomerArray());
        persEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreatePersonArray());
        ordEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateOrdersArray());
        numEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateNumberArray());
        createNumberArray = DATA.DATA.CreateNumberArray;
        createStringArray = DATA.DATA.CreateStringArray;
        createCarsArray = DATA.DATA.CreateCarsArray;
        createCarsUnionTestArray = DATA.DATA.CreateCarsUnionTestArray;
        createProductArray = DATA.DATA.CreateProductArray;
        createSortTestArray = DATA.DATA.CreateSortTestArray;
        createRandomNumberArray = DATA.DATA.CreateRandomNumberArray;
    });
    suite("aggregate", () => {
        let numberResult;
        let stringResult;
        let carNumberResult;
        let carStringResult;
        test("Should return '55' on TS.Linq.Enumerator<number>.", () => {
            numberResult = TS_1.TS.Linq.Extensions.aggregate(createNumberArray(), (first, second) => {
                return first + second;
            });
            assert.equal(numberResult, 55, "should return '55' on TS.Linq.Enumerator<number> .");
        });
        test("Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerator<string>.", () => {
            stringResult = TS_1.TS.Linq.Extensions.aggregate(createStringArray(), (first, second) => {
                return first + ", " + second;
            });
            assert.equal(stringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerator<string> .");
        });
        test("Should return 595 on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'horsePower' and a seed value of '0'.", () => {
            carNumberResult = TS_1.TS.Linq.Extensions.aggregate(createCarsArray(), (first, second) => first + second.horsePower, 0);
            assert.equal(carNumberResult, 595, "Should return 595 on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'horsePower' and a seed value of '0'.");
        });
        test("Should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'name' and a seed value of \"\".", () => {
            carStringResult = TS_1.TS.Linq.Extensions.aggregate(createCarsArray(), (first, second) => first + second.name, "");
            assert.equal(carStringResult, "BMWAUDIVWFIATTRABANT", "Should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'name' and a seed value of \"\".");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.", () => {
            //Empty enumerator
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.aggregate(TS_1.TS.Linq.Enumerator.Empty, (first, second) => { return first + second; });
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            //Null enumerator
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.aggregate(null, (first, second) => { return first + second; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            //Undefined enumerator
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.aggregate(undefined, (first, second) => { return first + second; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.", () => {
            //Null accumulator
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.aggregate(createStringArray(), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.", () => {
            //Undefined accumulator
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.aggregate(createStringArray(), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.");
        });
    });
    suite("all", () => {
        let testResult;
        test("Should return true for an empty enumerator.", () => {
            assert.equal(TS_1.TS.Linq.Extensions.all(TS_1.TS.Linq.Enumerator.Empty, (item) => false), true, "Should return true for an empty enumerator.");
        });
        test("Should return true on a predicate that should pass.", () => {
            testResult = TS_1.TS.Linq.Extensions.all(createStringArray(), (item) => item.length >= 3);
            assert.ok(testResult, "Should return true on a predicate that should pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            testResult = TS_1.TS.Linq.Extensions.all(createStringArray(), (item) => item.length > 4);
            assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.all(null, (item) => item.length < 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.all(createStringArray(), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.all(undefined, (item) => item.length < 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.all(createStringArray(), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
        });
    });
    suite("any", () => {
        let testResult;
        test("Should return false on an empty 'enumerator'.", () => {
            assert.equal(TS_1.TS.Linq.Extensions.any(TS_1.TS.Linq.Enumerator.Empty, (item) => true), false, "Should return false on an empty 'enumerator'.");
        });
        test("Should return true on a predicate that should pass.", () => {
            testResult = TS_1.TS.Linq.Extensions.any(createStringArray(), (item) => item.length >= 3);
            assert.ok(testResult, "Should return true on a predicate that should pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            testResult = TS_1.TS.Linq.Extensions.any(createStringArray(), (item) => item.length < 2);
            assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");
        });
        test("Should return true on a none empty 'enumerable' without predicate.", () => {
            testResult = TS_1.TS.Linq.Extensions.any(createStringArray());
            assert.ok(testResult, "Should return true on a none empty 'enumerable' without predicate.");
        });
        test("Should return false on an empty 'enumerable' without predicate.", () => {
            testResult = TS_1.TS.Linq.Extensions.any(TS_1.TS.Linq.Enumerator.Empty);
            assert.ok(!testResult, "Should return false on an empty 'enumerable' without predicate.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.any(null, (item) => item.length < 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.any(undefined, (item) => item.length < 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("average", () => {
        let testNumberArray;
        let testResult;
        test("Should return the expected average.", () => {
            testNumberArray = createNumberArray();
            testResult = TS_1.TS.Linq.Extensions.average(new TS_1.TS.Linq.Enumerator(testNumberArray));
            assert.equal(testResult, 5.5, "Should return the expected average.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.average(new TS_1.TS.Linq.Enumerator([]));
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.average(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.average(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.OverflowException\" for an 'Enumerator<number>' which elements sum exceedes the number range.", () => {
            testNumberArray.push(Number.MAX_VALUE / 2);
            testNumberArray.push(Number.MAX_VALUE);
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.average(new TS_1.TS.Linq.Enumerator(testNumberArray));
            }, TS_1.TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an 'Enumerator<number>' which elements sum exceedes the number range.");
        });
    });
    suite("concat", () => {
        let concatenatedNumberEnumerator;
        let concatenatedStringEnumerator;
        let numberArray;
        let stringArray;
        let compareNumberArray;
        test("Should return the expected result of the concatenation.", () => {
            concatenatedNumberEnumerator = TS_1.TS.Linq.Extensions.concat(new TS_1.TS.Linq.Enumerator(createNumberArray()), new TS_1.TS.Linq.Enumerator(createNumberArray()));
            numberArray = TS_1.TS.Linq.Extensions.toArray(concatenatedNumberEnumerator);
            assert.deepEqual(numberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return the expected result of the concatenation.");
        });
        test("Should return the expected result of the concatenation.", () => {
            concatenatedStringEnumerator = TS_1.TS.Linq.Extensions.concat(new TS_1.TS.Linq.Enumerator(createStringArray()), new TS_1.TS.Linq.Enumerator(createStringArray()));
            stringArray = TS_1.TS.Linq.Extensions.toArray(concatenatedStringEnumerator);
            assert.deepEqual(stringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return the expected result of the concatenation.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.concat(null, new TS_1.TS.Linq.Enumerator(createStringArray()));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.concat(new TS_1.TS.Linq.Enumerator(createStringArray()), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.concat(undefined, new TS_1.TS.Linq.Enumerator(createStringArray()));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.concat(new TS_1.TS.Linq.Enumerator(createStringArray()), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("contains", () => {
        let testResult;
        let emptyEnumerator;
        let testCar;
        testCar = new DATA.DATA.Car("SCODA");
        emptyEnumerator = new TS_1.TS.Linq.Enumerator([]);
        test("Should return the expected result of the contains function.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createNumberArray()), 5);
            assert.ok(testResult, "Should return the expected result of the contains function.");
        });
        test("Should return the expected result of the contains function.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createNumberArray()), 11);
            assert.ok(!testResult, "Should return the expected result of the contains function.");
        });
        test("Should return the expected result of the contains function.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createStringArray()), "five");
            assert.ok(testResult, "Should return the expected result of the contains function.");
        });
        test("Should return the expected result of the contains function.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createStringArray()), "eleven");
            assert.ok(!testResult, "Should return the expected result of the contains function.");
        });
        test("Should return the expected result of the contains function.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(emptyEnumerator, 123);
            assert.ok(!testResult, "Should return the expected result of the contains function.");
        });
        test("Should return the expected result of the contains function which uses an equality comparer.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createCarsArray()), createCarsArray()[3], (first, second) => first.name == second.name);
            assert.ok(testResult, "Should return the expected result of the contains function which uses an equality comparer.");
        });
        test("Should return the expected result of the contains function which uses an equality comparer.", () => {
            testResult = TS_1.TS.Linq.Extensions.contains(new TS_1.TS.Linq.Enumerator(createCarsArray()), testCar, (first, second) => first.name == second.name);
            assert.ok(!testResult, "Should return the expected result of the contains function which uses an equality comparer.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.contains(null, 123);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'element' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.contains(emptyEnumerator, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'element' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.contains(undefined, 123);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.contains(emptyEnumerator, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");
        });
    });
    suite("count", () => {
        let numberEnumerator;
        let stringEnumerator;
        let carEnumerator;
        test("Should count 10 numbers out of 10.", () => {
            numberEnumerator = new TS_1.TS.Linq.Enumerator(createNumberArray());
            assert.equal(TS_1.TS.Linq.Extensions.count(numberEnumerator), 10, "Should count 10 numbers out of 10.");
        });
        test("Should count 5 numbers greater 5 out of 10.", () => {
            numberEnumerator = new TS_1.TS.Linq.Enumerator(createNumberArray());
            assert.equal(TS_1.TS.Linq.Extensions.count(numberEnumerator, (item) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
        });
        test("Should counted 0 on an empty enumerator.", () => {
            assert.equal(TS_1.TS.Linq.Extensions.count(new TS_1.TS.Linq.Enumerator([])), 0, "Should counted 0 on an empty enumerator.");
        });
        test("Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.", () => {
            stringEnumerator = new TS_1.TS.Linq.Enumerator(createStringArray());
            assert.equal(TS_1.TS.Linq.Extensions.count(stringEnumerator, (item) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
        });
        test("Should count 4 elements with horsePower greater 100 in an 'Enumerator<TDATA.Car>' using a predicate.", () => {
            carEnumerator = new TS_1.TS.Linq.Enumerator(createCarsArray());
            assert.equal(TS_1.TS.Linq.Extensions.count(carEnumerator, (item) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerator<TDATA.Car>' using a predicate.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.count(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.count(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("cycle", () => {
        let stringEnumerator;
        let resultEnumerator;
        let resultArray;
        test("Should return 40 elements after a call to 'take(40)'.", () => {
            stringEnumerator = new TS_1.TS.Linq.Enumerator(createStringArray());
            resultEnumerator = TS_1.TS.Linq.Extensions.take(TS_1.TS.Linq.Extensions.cycle(stringEnumerator), 40);
            resultArray = TS_1.TS.Linq.Extensions.toArray(resultEnumerator);
            assert.equal(resultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");
        });
        test("Should return an empty enumerator if the argument 'enumerator' was also an empty enumerator.", () => {
            resultEnumerator = TS_1.TS.Linq.Extensions.take(TS_1.TS.Linq.Extensions.cycle(new TS_1.TS.Linq.Enumerator([])), 20);
            resultArray = TS_1.TS.Linq.Extensions.toArray(resultEnumerator);
            assert.equal(resultArray.length, 0, "Should return an empty enumerator if the argument 'enumerator' was also an empty enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.cycle(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.cycle(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("defaultIfEmpty", () => {
        let carEnumerator;
        let numEnumerator;
        let resultCarArray;
        let resultNumArray;
        test("Should return an enumerator with one default object element if called with an empty enumerator.", () => {
            carEnumerator = TS_1.TS.Linq.Extensions.defaultIfEmpty(TS_1.TS.Linq.Enumerator.Empty, DATA.DATA.Car);
            resultCarArray = TS_1.TS.Linq.Extensions.toArray(carEnumerator);
            assert.deepEqual(resultCarArray[0], new DATA.DATA.Car(), "Should return an enumerator with one default object element if called with an empty enumerator.");
        });
        test("Should return the original enumerator if called with a none empty enumerator.", () => {
            carEnumerator = TS_1.TS.Linq.Extensions.defaultIfEmpty(new TS_1.TS.Linq.Enumerator(createCarsArray()), DATA.DATA.Car);
            resultCarArray = TS_1.TS.Linq.Extensions.toArray(carEnumerator);
            assert.deepEqual(resultCarArray, createCarsArray(), "Should return the original enumerator if called with a none empty enumerator.");
        });
        test("Should return an enumerator with one default primitive value element if called with an empty enumerator.", () => {
            numEnumerator = TS_1.TS.Linq.Extensions.defaultIfEmpty(TS_1.TS.Linq.Enumerator.Empty, 1);
            resultNumArray = TS_1.TS.Linq.Extensions.toArray(numEnumerator);
            assert.deepEqual(resultNumArray, [1], "Should return an enumerator with one default primitive value element if called with an empty enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.defaultIfEmpty(null, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.defaultIfEmpty(new TS_1.TS.Linq.Enumerator([]), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.defaultIfEmpty(undefined, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.defaultIfEmpty(new TS_1.TS.Linq.Enumerator([]), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
        });
    });
    suite("distinct", () => {
        let doubleCarArray;
        let carEnumerator;
        let resultCarArray;
        let numberArray;
        test("Should return an enumerator with the expected elements.", () => {
            doubleCarArray = createCarsArray().concat(createCarsArray());
            carEnumerator = TS_1.TS.Linq.Extensions.distinct(new TS_1.TS.Linq.Enumerator(doubleCarArray), (first, second) => first.name == second.name);
            resultCarArray = TS_1.TS.Linq.Extensions.toArray(carEnumerator);
            assert.deepEqual(resultCarArray, createCarsArray(), "Should return an enumerator with the expected elements.");
        });
        test("Should return an enumerator with the expected elements.", () => {
            numberArray = TS_1.TS.Linq.Extensions.toArray(TS_1.TS.Linq.Extensions.distinct(new TS_1.TS.Linq.Enumerator([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9])));
            assert.equal(numberArray.length, 10, "Should return an enumerator with the expected elements.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.distinct(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.distinct(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("elementAt", () => {
        let carEnumerator;
        let resultCar;
        test("Should return the element at the required position.", () => {
            carEnumerator = new TS_1.TS.Linq.Enumerator(createCarsArray());
            resultCar = TS_1.TS.Linq.Extensions.elementAt(carEnumerator, 3);
            assert.deepEqual(resultCar, createCarsArray()[3], "Should return the element at the required position.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(carEnumerator, -3);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(carEnumerator, 3.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
        });
        test("The call should fail with a \"TS.IndexOutOfRangeException\" for an invalid 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(carEnumerator, 20);
            }, TS_1.TS.IndexOutOfRangeException, "The call should fail with a \"TS.IndexOutOfRangeException\" for an invalid 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(null, 20);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(carEnumerator, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(undefined, 20);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAt(carEnumerator, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
        });
    });
    suite("elementAtOrDefault", () => {
        let carEnumerator;
        let resultCar;
        test("Should return the element at the required position.", () => {
            carEnumerator = new TS_1.TS.Linq.Enumerator(createCarsArray());
            resultCar = TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 3, DATA.DATA.Car);
            assert.deepEqual(resultCar, createCarsArray()[3], "Should return the element at the required position.");
        });
        test("Should return a default element for a required position out of the range of the enumerator.", () => {
            resultCar = TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, DATA.DATA.Car);
            assert.deepEqual(resultCar, new DATA.DATA.Car(), "Should return a default element for a required position out of the range of the enumerator.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, -3, DATA.DATA.Car);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
            ;
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(null, 20, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, null, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(undefined, 20, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, undefined, DATA.DATA.Car);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
        });
    });
    suite("empty", () => {
        let emptyCarEnumerator;
        test("Should create an iterable object.", () => {
            emptyCarEnumerator = new TS_1.TS.Linq.Enumerator(new Array());
            assert.ok(TS_1.TS.Utils.Assert.isIterable(emptyCarEnumerator), "Should create an iterable object.");
        });
        test("The created enumerator should have 0 elements.", () => {
            emptyCarEnumerator = new TS_1.TS.Linq.Enumerator(new Array());
            assert.ok(TS_1.TS.Linq.Extensions.count(emptyCarEnumerator) == 0, "The created enumerator should have 0 elements.");
        });
    });
    suite("except", () => {
        let lowNumEnum;
        let higNumEnum;
        let resultEnum;
        let resultArray;
        let carEnum;
        let carResultEnum;
        let carResultArray;
        test("Should return a result set with 3 elements.", () => {
            lowNumEnum = new TS_1.TS.Linq.Enumerator([1, 2, 3, 4, 5, 6]);
            higNumEnum = new TS_1.TS.Linq.Enumerator([4, 5, 6, 7, 8, 9]);
            resultEnum = TS_1.TS.Linq.Extensions.except(lowNumEnum, higNumEnum);
            resultArray = TS_1.TS.Linq.Extensions.toArray(resultEnum);
            assert.deepEqual(resultArray, [1, 2, 3], "Should return a result set with 3 elements.");
        });
        test("Should return a result set with 4 elements.", () => {
            lowNumEnum = new TS_1.TS.Linq.Enumerator([1, 2, 3, 4, 5, 6]);
            resultEnum = TS_1.TS.Linq.Extensions.except(lowNumEnum, new TS_1.TS.Linq.Enumerator([1, 2]));
            resultArray = TS_1.TS.Linq.Extensions.toArray(resultEnum);
            assert.deepEqual(resultArray, [3, 4, 5, 6], "Should return a result set with 4 elements.");
        });
        test("Should return a result set with 4 elements.", () => {
            lowNumEnum = new TS_1.TS.Linq.Enumerator([1, 2, 3, 4, 5, 6]);
            resultEnum = TS_1.TS.Linq.Extensions.except(lowNumEnum, new TS_1.TS.Linq.Enumerator([2, 5]));
            resultArray = TS_1.TS.Linq.Extensions.toArray(resultEnum);
            assert.deepEqual(resultArray, [1, 3, 4, 6], "Should return a result set with 4 elements.");
        });
        test("Should return a result set with 3 elements.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator([
                new DATA.DATA.Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000),
                new DATA.DATA.Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000),
                new DATA.DATA.Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000),
                new DATA.DATA.Car("FIAT", 60, false, Date.parse("1980-01-01"), 500)
            ]);
            carResultEnum = TS_1.TS.Linq.Extensions.except(new TS_1.TS.Linq.Enumerator(createCarsArray()), carEnum, (first, second) => first.name == second.name);
            carResultArray = TS_1.TS.Linq.Extensions.toArray(carResultEnum);
            assert.equal(carResultArray.length, 3, "Should return a result set with 3 elements.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.except(null, TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.except(TS_1.TS.Linq.Enumerator.Empty, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.except(undefined, TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.except(TS_1.TS.Linq.Enumerator.Empty, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerable' argument.");
        });
    });
    suite("first", () => {
        let result;
        test("Should return the first match in the result set.", () => {
            result = TS_1.TS.Linq.Extensions.first(persEnum);
            assert.equal(result.LastName, "Sánchez", "Should return the first match in the result set.");
        });
        test("Should return the first match in the result set when called with a predicate.", () => {
            result = TS_1.TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Michael");
            assert.equal(result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for call with no match.", () => {
            assert.throws(() => {
                result = TS_1.TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Snow-white");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for call with no match.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an empty enumerator.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty enumerator.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an invalid predicate.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(persEnum, (item) => item.NoAttribute == "NOP");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an invalid predicate.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for a call with an empty 'enumerator' and a 'predicate'.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(TS_1.TS.Linq.Enumerator.Empty, (item) => item.toString() == "5");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a call with an empty 'enumerator' and a 'predicate'.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("firstOrDefault", () => {
        let result;
        let carEnum;
        test("Should return the first match in the result set.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            result = TS_1.TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car);
            assert.equal(result.name, "BMW", "Should return the first match in the result set.");
        });
        test("Should return a default object for a call with a predicate with no match.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            result = TS_1.TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "faöejrfkesjköpaf");
            assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a predicate with no match.");
        });
        test("Should return the first match in the result set when called with a matching predicate.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            result = TS_1.TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "AUDI");
            assert.equal(result.name, "AUDI", "Should return the first match in the result set when called with a matching predicate.");
        });
        test("Should return a default object for a call with a predicate with no match.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            result = TS_1.TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.name == "faöejrfkesjköpaf");
            assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a predicate with no match.");
        });
        test("Should return a default object for a call with a invalid predicate.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            result = TS_1.TS.Linq.Extensions.firstOrDefault(carEnum, DATA.DATA.Car, (item) => item.noValidAttribute == 5);
            assert.deepEqual(result, new DATA.DATA.Car(), "Should return a default object for a call with a invalid predicate.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.firstOrDefault(null, DATA.DATA.Car, (item) => true);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.firstOrDefault(TS_1.TS.Linq.Enumerator.Empty, null, (item) => true);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.firstOrDefault(undefined, DATA.DATA.Car, (item) => true);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.firstOrDefault(TS_1.TS.Linq.Enumerator.Empty, undefined, (item) => true);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
        });
    });
    suite("foreach", () => {
        var passed;
        let carEnum;
        test("Should return an enumeration with the expected changes on each element.", () => {
            carEnum = new TS_1.TS.Linq.Enumerator(createCarsArray().concat(createCarsUnionTestArray()));
            carEnum = TS_1.TS.Linq.Extensions.forEach(carEnum, (item) => item.horsePower = 12);
            passed = true;
            for (let item of carEnum) {
                if (item.horsePower != 12) {
                    passed = false;
                }
            }
            assert.ok(passed, "Should return an enumeration with the expected changes on each element.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.forEach(null, item => { });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.forEach(undefined, item => { });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'action' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.forEach(carEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'action' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'action' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.forEach(carEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'action' argument.");
        });
    });
    suite("groupBy", () => {
        let resultCustomerEnum;
        let resultProductEnum;
        let resultProductEnumStorageRoom;
        let resultProductEnumerableStorageRoomConcat;
        test("Should return 21 elements for the executed expression.", () => {
            resultCustomerEnum = TS_1.TS.Linq.Extensions.groupBy(custEnum, _CUST => _CUST.Country);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultCustomerEnum), 21, "Should return 21 elements for the executed expression.");
        });
        test("Should return 5 elements for the executed expression with equalityComparer.", () => {
            let resProArr = createProductArray();
            resultProductEnum = TS_1.TS.Linq.Extensions.groupBy(new TS_1.TS.Linq.Enumerator(resProArr), item => TS_1.TS.Utils.findSingleCurrency(item.Currency).Code);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultProductEnum), 5, "Should return 5 elements for the executed expression with equalityComparer.");
        });
        //for (let outerItem of resultProductEnum)
        //{
        //  console.log(JSON.stringify(outerItem));
        //  for (let innerItem of outerItem)
        //  {
        //    console.log("  " + JSON.stringify(innerItem));
        //  }
        //}
        test("Should return 5 elements for the executed expression with elementSelector.", () => {
            function equComp(first, second) {
                return TS_1.TS.Utils.findSingleCurrency(first).Code === TS_1.TS.Utils.findSingleCurrency(second).Code;
            }
            let resProArr = createProductArray();
            resultProductEnumStorageRoom = TS_1.TS.Linq.Extensions.groupBy(new TS_1.TS.Linq.Enumerator(resProArr), item => TS_1.TS.Utils.findSingleCurrency(item.Currency).Code, equComp, (item) => item.Storage.Room);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultProductEnumStorageRoom), 5, "Should return 5 elements for the executed expression with elementSelector.");
        });
        //for (let outerItem of resultProductEnumStorageRoom)
        //{
        //  console.log(JSON.stringify(outerItem));
        //  for (let innerItem of outerItem)
        //  {
        //    console.log("  " + JSON.stringify(innerItem));
        //  }
        //}
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupBy(null, _CUST => _CUST);
                ;
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupBy(undefined, _CUST => _CUST);
                ;
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupBy(TS_1.TS.Linq.Enumerator.Empty, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupBy(TS_1.TS.Linq.Enumerator.Empty, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.");
        });
    });
    suite("groupJoin", () => {
        let jointEnum;
        let ordersCount;
        //Run the following query in 'LinqPad' against the 'NORTHWND' database.
        //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
        //The query will return 91 Results.
        test("Should return 91 elements for the executed expression.", () => {
            jointEnum = TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }));
            assert.equal(TS_1.TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");
            ordersCount = 0;
            for (let item of jointEnum) {
                //console.log("***************************************************");
                //console.log(JSON.stringify(item));
                //console.log("***************************************************");
                for (let order of item.OrderGroup) {
                    ordersCount++;
                }
            }
            //console.log("Total orders: " + ordersCount);
            assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");
        });
        //
        //Call the query once again but using the 'equalityComparer' instead of the default comparer.
        //Should return the same result.
        //
        test("Should return 830 order records for the executed expression.", () => {
            jointEnum = TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey, innerKey) => outerKey == innerKey);
            assert.equal(TS_1.TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");
            ordersCount = 0;
            for (let item of jointEnum) {
                //console.log("***************************************************");
                //console.log(JSON.stringify(item));
                //console.log("***************************************************");
                for (let order of item.OrderGroup) {
                    ordersCount++;
                }
            }
            assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
        });
    });
    suite("intersect", () => {
        let carsUnionEnum;
        let carsEnum;
        let carsIntersect;
        let numberEnumFirst;
        let numberEnumSecond;
        let numberIntersect;
        test("Schould return a result set with 2 elements when called with an equality comparer.", () => {
            carsUnionEnum = new TS_1.TS.Linq.Enumerator(createCarsUnionTestArray());
            carsEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            carsIntersect = TS_1.TS.Linq.Extensions.intersect(carsEnum, carsUnionEnum, (first, second) => first.name === second.name);
            assert.equal(TS_1.TS.Linq.Extensions.count(carsIntersect), 2, "Schould return a result set with 2 elements when called with an equality comparer.");
        });
        test("Schould return a result set with 4 elements when called without an equality comparer.", () => {
            numberEnumFirst = new TS_1.TS.Linq.Enumerator(createNumberArray());
            numberEnumSecond = new TS_1.TS.Linq.Enumerator([2, 4, 7, 8]);
            numberIntersect = TS_1.TS.Linq.Extensions.intersect(numberEnumFirst, numberEnumSecond);
            assert.equal(TS_1.TS.Linq.Extensions.count(numberIntersect), 4, "Schould return a result set with 4 elements when called without an equality comparer.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.intersect(null, numberEnumSecond);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.intersect(undefined, numberEnumSecond);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.intersect(numberEnumFirst, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.intersect(numberEnumFirst, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("join", () => {
        let jointEnum;
        test("Should return 830 records for the executed expression.", () => {
            jointEnum = TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            assert.equal(TS_1.TS.Linq.Extensions.count(jointEnum), 830, "Should return 830 records for the executed expression.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
        });
    });
    suite("last", () => {
        let result;
        test("Should return the last element in the result set.", () => {
            result = TS_1.TS.Linq.Extensions.last(persEnum);
            assert.equal(result.LastName, "Cox", "Should return the last element in the result set.");
        });
        test("Should return the last match in the result set when called with a predicate.", () => {
            result = TS_1.TS.Linq.Extensions.last(persEnum, (item) => item.FirstName == "Michael");
            assert.equal(result.LastName, "Martin", "Should return the last match in the result set when called with a predicate.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.last(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" when called with a predicate that doesn't match.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.last(persEnum, (item) => item.NoAttribute == "NOP");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" when called with a predicate that doesn't match.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator when called with a predicate.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.last(TS_1.TS.Linq.Enumerator.Empty, (item) => item.toString() == "5");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator when called with a predicate.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.last(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.last(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("lastOrDefault", () => {
        let result;
        test("Should return the last element in the enumerable.", () => {
            result = TS_1.TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer);
            assert.equal(result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");
        });
        test("Should return a default object if the enumerable is empyt.", () => {
            result = TS_1.TS.Linq.Extensions.lastOrDefault(TS_1.TS.Linq.Enumerator.Empty, DATA.DATA.Customer);
            assert.deepEqual(result, new DATA.DATA.Customer(), "Should return a default object if the enumerable is empyt.");
        });
        test("Should return the last match in the result set when called with a predicate.", () => {
            result = TS_1.TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer, (Item) => Item.Country == "USA");
            assert.equal(result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate.");
        });
        test("Should return a default object when called with a predicate that doesn't match.", () => {
            result = TS_1.TS.Linq.Extensions.lastOrDefault(custEnum, DATA.DATA.Customer, (Item) => Item.Country == "NOP");
            assert.deepEqual(result, new DATA.DATA.Customer(), "Should return a default object when called with a predicate that doesn't match.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.lastOrDefault(null, DATA.DATA.Customer);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.lastOrDefault(undefined, DATA.DATA.Customer);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.lastOrDefault(custEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.lastOrDefault(custEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
        });
        //assert.ok(false, "Not implemented.");
    });
    suite("max", () => {
        let max;
        //Run the following query in 'LinqPad' against the 'NORTHWND' database.
        //Orders.Select(_ORD => _ORD.Freight).Max().Dump();
        //The query will return 1007.6400
        test("Should return the expected value.", () => {
            max = TS_1.TS.Linq.Extensions.max(TS_1.TS.Linq.Extensions.select(ordEnum, (_ORD => _ORD.Freight)));
            assert.equal(max, 1007.64, "Should return the expected value.");
        });
        test("Should return the expected value.", () => {
            max = TS_1.TS.Linq.Extensions.max(new TS_1.TS.Linq.Enumerator(createNumberArray()));
            assert.equal(max, 10, "Should return the expected value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.max(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.max(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for a empty 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.max(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for a empty 'enumerator' argument.");
        });
    });
    suite("min", () => {
        let min;
        //Run the following query in 'LinqPad' against the 'NORTHWND' database.
        //Orders.Select(_ORD => _ORD.Freight).Min().Dump();
        //The query will return 0.0200
        test("Should return the expected value.", () => {
            min = TS_1.TS.Linq.Extensions.min(TS_1.TS.Linq.Extensions.select(ordEnum, _ORD => _ORD.Freight));
            assert.equal(min, 0.02, "Should return the expected value.");
        });
        test("Should return the expected value.", () => {
            min = TS_1.TS.Linq.Extensions.min(new TS_1.TS.Linq.Enumerator(createNumberArray()));
            assert.equal(min, 1, "Should return the expected value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.min(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.min(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorExceptio\" for a empty 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.min(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptio\" for a empty 'enumerable' argument.");
        });
    });
    suite("orderBy", () => {
        let orderedEnumerator;
        let orderCorrect;
        let index;
        let partIter;
        let partIterResult;
        let partCount = 0;
        let lastItem = "";
        let lastItemColor = "";
        let lastItemCountry = "";
        let lastNumber = 0;
        test("The orderedEnumerator items should be sorted by color in ascending order.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(new TS_1.TS.Linq.Enumerator(createSortTestArray()), (item) => item.color);
            orderCorrect = true;
            lastItemColor = "";
            for (let item of orderedEnumerator) {
                if (item.color < lastItemColor) {
                    orderCorrect = false;
                }
                lastItemColor = item.color;
            } //END for
            assert.ok(orderCorrect, "The orderedEnumerator items should be sorted by color in ascending order.");
        });
        test("The orderedEnumerator should hold three partitions for the different colors found during last sort.", () => {
            partIter = orderedEnumerator.partitionIterator();
            partCount = 0;
            partIterResult = partIter.next();
            while (!partIterResult.done) {
                partCount++;
                partIterResult = partIter.next();
            }
            assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");
        });
        test("Should returns an array of numbers sorted in ascending order.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(new TS_1.TS.Linq.Enumerator(createRandomNumberArray(100)), (item) => item);
            orderCorrect = true;
            lastNumber = 0;
            for (let item of orderedEnumerator) {
                if (item < lastNumber) {
                    orderCorrect = false;
                }
                lastNumber = item;
            } //END for
            assert.ok(orderCorrect, "Should returns an array of numbers sorted in ascending order.");
        });
        test("Should returns an array of customers sorted by country in ascending order.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(custEnum, item => item.Country, (first, second) => first.localeCompare(second));
            lastItemCountry = "";
            for (let item of orderedEnumerator) {
                if (item.Country < lastItemCountry) {
                    orderCorrect = false;
                }
                lastItemCountry = item.Country;
            } //END for
            assert.ok(orderCorrect, "Should returns an array of customers sorted by country in ascending order.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderBy(null, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderBy(undefined, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderBy(TS_1.TS.Linq.Enumerator.Empty, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderBy(TS_1.TS.Linq.Enumerator.Empty, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("orderByDescending", () => {
        let sortTestEnum;
        let randomNumberEnum;
        let resultSortTestEnum;
        let resultNumberEnum;
        let resultCustomersEnum;
        let orderCorrect;
        test("The array of ISortTestItems should be sorted by color in descending order.", () => {
            sortTestEnum = new TS_1.TS.Linq.Enumerator(createSortTestArray());
            resultSortTestEnum = TS_1.TS.Linq.Extensions.orderByDescending(sortTestEnum, (item) => item.color);
            orderCorrect = true;
            let lastColor = null;
            for (let item of resultSortTestEnum) {
                if (lastColor != null) {
                    if (lastColor < item.color) {
                        orderCorrect = false;
                    }
                    lastColor = item.color;
                }
            }
            assert.ok(orderCorrect, "The array of ISortTestItems should be sorted by color in descending order.");
        });
        test("Should returns an array of numbers sorted in descending order.", () => {
            randomNumberEnum = new TS_1.TS.Linq.Enumerator(createRandomNumberArray(100));
            resultNumberEnum = TS_1.TS.Linq.Extensions.orderByDescending(randomNumberEnum, item => item);
            orderCorrect = true;
            let lastNumber = null;
            for (let item of resultNumberEnum) {
                if (lastNumber != null) {
                    if (lastNumber < item) {
                        orderCorrect = false;
                    }
                    lastNumber = item;
                }
            }
            assert.ok(orderCorrect, "Should returns an array of numbers sorted in descending order.");
        });
        test("Should return an array sorted by country in descending order using the specified key and comparer.", () => {
            resultCustomersEnum = TS_1.TS.Linq.Extensions.orderByDescending(custEnum, item => item.Country, (first, second) => {
                if (first > second) {
                    return 1;
                }
                ;
                if (first < second) {
                    return -1;
                }
                ;
                return 0;
            });
            let resultString = TS_1.TS.Linq.Extensions.first(resultCustomersEnum).Country + ", " + TS_1.TS.Linq.Extensions.last(resultCustomersEnum).Country;
            assert.equal(resultString, "Venezuela, Argentina", "Should return an array sorted by country in descending order using the specified key and comparer.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderByDescending(null, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderByDescending(undefined, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderByDescending(custEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.orderByDescending(custEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
    });
    suite("random", () => {
        let stringResultEnum;
        let isRandom = false;
        test("Should return a string array in random order.", () => {
            stringResultEnum = TS_1.TS.Linq.Extensions.take(TS_1.TS.Linq.Extensions.random(createStringArray()), 50);
            let lastItem = null;
            for (let item of stringResultEnum) {
                if (lastItem != null) {
                    if (lastItem != item) {
                        isRandom = true;
                    }
                }
                lastItem = item;
            }
            assert.ok(isRandom, "Should return a string array in random order.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.first(TS_1.TS.Linq.Extensions.random(TS_1.TS.Linq.Enumerator.Empty));
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.random(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.random(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
        });
    });
    suite("range", () => {
        let resultEnum;
        test("Should return an enumerator with 50 elements.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.range(1, 50);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 50, "Should return an enumerator with 50 elements.");
        });
        test("Should return an enumerable with 0 elements.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.range(111, 0);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 0, "Should return an enumerable with 0 elements.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a 'start, count' combination which exceedes the allowed range.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(Number.MAX_SAFE_INTEGER - 2, 5);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a 'start, count' combination which exceedes the allowed range.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer in the range [Number.MIN_SAFE_INTEGER .. Number.MAX_SAFE_INTEGER]", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(Number.MAX_VALUE, 5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer in the range [Number.MIN_SAFE_INTEGER .. Number.MAX_SAFE_INTEGER]");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(5.5, 5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(1, -3);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'start' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(null, 33);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'start' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'start' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(undefined, 33);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'start' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(12, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.range(12, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.");
        });
    });
    suite("repeat", () => {
        let sourceElement;
        let resultEnum;
        test("Should return a result with as much elements as required and of the same type.", () => {
            sourceElement = createCarsArray()[0];
            resultEnum = TS_1.TS.Linq.Extensions.repeat(sourceElement, 50);
            assert.ok(TS_1.TS.Linq.Extensions.count(resultEnum) == 50 && TS_1.TS.Linq.Extensions.first(resultEnum).name == "BMW" && TS_1.TS.Linq.Extensions.last(resultEnum).name == "BMW", "Should return a result with as much elements as required and of the same type.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.repeat(undefined, 33);
            }, TS_1.TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeExceptionn\" for a negative 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.repeat(sourceElement, -33);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeExceptionn\" for a negative 'count' argument.");
        });
    });
    suite("reverse", () => {
        let resultEnum;
        let controlArray;
        let isReverse;
        test("Should return an enumerator in reverse order.", () => {
            controlArray = createNumberArray().reverse();
            resultEnum = TS_1.TS.Linq.Extensions.reverse(createNumberArray());
            isReverse = true;
            for (let item of resultEnum) {
                if (item != controlArray.shift()) {
                    isReverse = false;
                    break;
                } //END if
            } //END for
            assert.ok(isReverse, "Should return an enumerator in reverse order.");
        });
        test("Should return an empty enumerator if the input enumerator was also empty.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.reverse(TS_1.TS.Linq.Enumerator.Empty);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 0, "Should return an empty enumerator if the input enumerator was also empty.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.reverse(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.reverse(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("select", () => {
        let resultEnum;
        let expensiveCount;
        test("Should return two expensive cars from the cars enumerable.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.select(createCarsArray(), item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") }));
            expensiveCount = 0;
            for (let item of resultEnum) {
                if (item.expensive == "yes") {
                    expensiveCount++;
                } //END if
            } //END for
            assert.equal(expensiveCount, 2, "Should return two expensive cars from the cars enumerable.");
        });
        test("The call should fail with a \"TS.Linq.SelectorException\" for a call with an invalid 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.select(resultEnum, item => item.NOP).first();
            }, TS_1.TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorException\" for a call with an invalid 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.select(null, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.select(undefined, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.select(resultEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.select(resultEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("selectMany", () => {
        let resultSelectMany;
        let resultSelectManyOrder;
        test("Should return the full list of pet names.", () => {
            let petOwners = [{ Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
                { Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
                { Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }];
            resultSelectMany = TS_1.TS.Linq.Extensions.selectMany(petOwners, owner => owner.Pets);
            assert.equal(TS_1.TS.Linq.Extensions.count(resultSelectMany), 6, "Should return the full list of pet names.");
        });
        test("The number of elements in the selctMany result and the orders table should match.", () => {
            let result = TS_1.TS.Linq.Extensions.selectMany(custEnum, customer => {
                return TS_1.TS.Linq.Extensions.where(ordEnum, order => order.CustomerID == customer.CustomerID);
            });
            assert.equal(TS_1.TS.Linq.Extensions.count(result), TS_1.TS.Linq.Extensions.count(ordEnum), "The number of elements in the selctMany result and the orders table should match.");
        });
        test("The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.", () => {
            assert.throws(() => {
                let tempEnum = new TS_1.TS.Linq.Enumerator(["", 1]);
                TS_1.TS.Linq.Extensions.selectMany(tempEnum, item => item.NOP).first();
            }, TS_1.TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.selectMany(null, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.selectMany(undefined, item => item);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.selectMany(TS_1.TS.Linq.Enumerator.Empty, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
        test("The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.selectMany(TS_1.TS.Linq.Enumerator.Empty, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("sequenceEqual", () => {
        let numArray;
        let custEnumEx;
        let custArray;
        let compareResult;
        test("Should return true when comparing two equal enumerators", () => {
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(createNumberArray(), createNumberArray());
            assert.ok(compareResult, "Should return true when comparing two equal enumerators");
        });
        test("Should return true when comparing two equal enumerators using an equalityComparer", () => {
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(custEnum, custEnum, (first, second) => first.ContactName == second.ContactName);
            assert.ok(compareResult, "Should return true when comparing two equal enumerators using an equalityComparer");
        });
        test("Should return false when comparing two enumerators with different elements usin an equalityComparer", () => {
            custArray = custEnum.toArray();
            custArray[12] = new DATA.DATA.Customer("", "", "", "No contact name");
            custEnumEx = new TS_1.TS.Linq.Enumerator(custArray);
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(custEnum, custEnumEx, (first, second) => first.ContactName == second.ContactName);
            assert.ok(!compareResult, "Should return false when comparing two enumerators with different elements usin an equalityComparer");
        });
        test("Should return false when comparing two enumerators with different length", () => {
            numArray = createNumberArray();
            numArray.push(99);
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(createNumberArray(), numArray);
            assert.ok(!compareResult, "Should return false when comparing two enumerators with different length");
        });
        test("Should return false when comparing two unequal enumerators", () => {
            numArray = createNumberArray();
            numArray[5] = Math.PI;
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(createNumberArray(), numArray);
            assert.ok(!compareResult, "Should return false when comparing two unequal enumerators");
        });
        test("Should return true when comparing two empty enumerators", () => {
            compareResult = TS_1.TS.Linq.Extensions.sequenceEqual(TS_1.TS.Linq.Enumerator.Empty, TS_1.TS.Linq.Enumerator.Empty);
            assert.ok(compareResult, "Should return true when comparing two empty enumerators");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sequenceEqual(null, numArray);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sequenceEqual(undefined, numArray);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sequenceEqual(numArray, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sequenceEqual(numArray, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("shuffle", () => {
        let numEnum;
        test("Should return a result enumerator with the same length as the source array.", () => {
            numEnum = TS_1.TS.Linq.Extensions.shuffle(createNumberArray());
            assert.equal(TS_1.TS.Linq.Extensions.count(numEnum), createNumberArray().length, "Should return a result enumerator with the same length as the source array.");
        });
        test("Should return a shuffled enumerator which doesn't be equal to the source enumerator", () => {
            numEnum = TS_1.TS.Linq.Extensions.shuffle(createNumberArray());
            assert.notDeepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), createNumberArray(), "Should return a shuffled enumerator which doesn't be equal to the source enumerator");
        });
        test("A shuffeled empty enumerator should still be an empty enumerator.", () => {
            assert.deepEqual(TS_1.TS.Linq.Extensions.shuffle(TS_1.TS.Linq.Enumerator.Empty).toArray(), [], "A shuffeled empty enumerator should still be an empty enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.shuffle(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.shuffle(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("single", () => {
        let result;
        test("Should return the expected single result.", () => {
            result = TS_1.TS.Linq.Extensions.single(TS_1.TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"));
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Should return the expected single result.", () => {
            result = TS_1.TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID == "OTTIK");
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an 'enumerator' argument with more than one element.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(TS_1.TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1));
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an 'enumerator' argument with more than one element.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an empty 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which doesn't match.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(TS_1.TS.Linq.Enumerator.Empty, CUST => CUST.CustomerID == "NOP");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which doesn't match.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.single(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("singleOrDefault", () => {
        let result;
        test("Should return the expected single result.", () => {
            result = TS_1.TS.Linq.Extensions.singleOrDefault(TS_1.TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"), DATA.DATA.Customer);
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Should return the expected single result.", () => {
            result = TS_1.TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID == "OTTIK");
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Shoud return a default object for an 'enumerator' which is empty.", () => {
            result = TS_1.TS.Linq.Extensions.singleOrDefault(TS_1.TS.Linq.Enumerator.Empty, DATA.DATA.Customer);
            assert.deepEqual(result, new DATA.DATA.Customer(), "Shoud return a default object for an 'enumerator' which is empty.");
        });
        test("Shoud return a default object for a 'predicate' which has no match with the enumerator.", () => {
            result = TS_1.TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID == "NOP");
            assert.deepEqual(result, new DATA.DATA.Customer(), "Shoud return a default object for a 'predicate' which has no match with the enumerator.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException' for an 'enumerator' argument with more than one element.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(TS_1.TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1), DATA.DATA.Customer);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException' for an 'enumerator' argument with more than one element.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(custEnum, DATA.DATA.Customer, CUST => CUST.CustomerID.indexOf("BO") > -1);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(null, DATA.DATA.Customer);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(undefined, DATA.DATA.Customer);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(custEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.singleOrDefault(custEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
        });
    });
    suite("skip", () => {
        let numEnum;
        test("Should return a result array which matches with the expected array.", () => {
            numEnum = TS_1.TS.Linq.Extensions.skip(createNumberArray(), 4);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a result array which matches with the expected array.");
        });
        test("Should return an empty result when used on an empty enumerator.", () => {
            numEnum = TS_1.TS.Linq.Extensions.skip(TS_1.TS.Linq.Enumerator.Empty, 4);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), TS_1.TS.Linq.Extensions.toArray(TS_1.TS.Linq.Enumerator.Empty), "Should return an empty result when used on an empty enumerator.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skip(createNumberArray(), -5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skip(null, 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skip(undefined, 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("skipWhile", () => {
        let numEnum;
        test("Should return a enumerator which holds the expected value.", () => {
            numEnum = TS_1.TS.Linq.Extensions.skipWhile(createNumberArray(), item => item < 5);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a enumerator which holds the expected value.");
        });
        test("Should return an empty result enumerator when used with a predicate that has no match.", () => {
            numEnum = TS_1.TS.Linq.Extensions.skipWhile(createNumberArray(), item => item < 20);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), TS_1.TS.Linq.Extensions.toArray(TS_1.TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with a predicate that has no match.");
        });
        test("Should return an empty result enumerator when used with ab empty source enumerator.", () => {
            numEnum = TS_1.TS.Linq.Extensions.skipWhile(TS_1.TS.Linq.Enumerator.Empty, item => true);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), TS_1.TS.Linq.Extensions.toArray(TS_1.TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with ab empty source enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skipWhile(null, (item) => item < 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skipWhile(undefined, (item) => item < 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skipWhile(createNumberArray(), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.skipWhile(createNumberArray(), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
        });
    });
    suite("sum", () => {
        let result;
        test("Should return expected sum.", () => {
            result = TS_1.TS.Linq.Extensions.sum(createNumberArray());
            assert.equal(result, 55, "Should return expected sum.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumerableException\" for an empty 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sum(TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumerableException\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sum(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sum(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.OverflowException\" for an enumerator which exceeds the number range in sum.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.sum([(Number.MAX_VALUE / 2), Number.MAX_VALUE]);
            }, TS_1.TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an enumerator which exceeds the number range in sum.");
        });
    });
    suite("take", () => {
        let numberEnum;
        test("Should return a result array which matches with the expected array.", () => {
            numberEnum = TS_1.TS.Linq.Extensions.take(createNumberArray(), 4);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numberEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.take(createNumberArray(), -5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.take(null, 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.take(undefined, 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("takeWhile", () => {
        let numEnum;
        test("Should return a result array which matches with the expected array.", () => {
            numEnum = TS_1.TS.Linq.Extensions.takeWhile(createNumberArray(), item => item < 5);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");
        });
        test("Should only return alements util the first mismatch.", () => {
            numEnum = TS_1.TS.Linq.Extensions.takeWhile([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], item => item < 5);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should only return alements util the first mismatch.");
        });
        test("Should return an empty result enumerator for a predicate which has no match.", () => {
            numEnum = TS_1.TS.Linq.Extensions.takeWhile(createNumberArray(), item => item < -1);
            assert.deepEqual(TS_1.TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator for a predicate which has no match.");
        });
        test("Should return an empty result enumerator when used against an empt source enumerator.", () => {
            numEnum = TS_1.TS.Linq.Extensions.takeWhile(TS_1.TS.Linq.Enumerator.Empty, item => true);
            assert.deepEqual(TS_1.TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator when used against an empt source enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.takeWhile(null, item => true);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.takeWhile(undefined, item => item < 5);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.takeWhile(createNumberArray(), null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.takeWhile(createNumberArray(), undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
        });
    });
    suite("toArray", () => {
        let numArr;
        test("Should return a result array which matches with the source enumeator.", () => {
            numArr = TS_1.TS.Linq.Extensions.toArray(numEnum);
            assert.equal(numArr.length, numEnum.count(), "Should return a result array which matches with the source enumeator.");
        });
        test("Should return an empty array for an empty enumeator.", () => {
            numArr = TS_1.TS.Linq.Extensions.toArray(numEnum);
            assert.equal(TS_1.TS.Linq.Extensions.toArray(TS_1.TS.Linq.Enumerator.Empty).length, 0, "Should return an empty array for an empty enumeator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toArray(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toArray(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("toDictionary", () => {
        let resultDict;
        test("Should return a none null result object.", () => {
            resultDict = TS_1.TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
            assert.notEqual(resultDict, null, "Should return a none null result object.");
        });
        test("The result collections should have as much elements as the source.", () => {
            resultDict = TS_1.TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
            assert.equal(resultDict.count(), persEnum.count(), "The result collections should have as much elements as the source.");
        });
        test("The dictionary should be accessible by key.", () => {
            resultDict = TS_1.TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
            assert.equal(resultDict.getItem(10802).value.FirstName, "Katherine", "The dictionary should be accessible by key.");
        });
        test("The dictionary should be accessible by key.", () => {
            resultDict = TS_1.TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
            assert.equal(resultDict.getItem(10802).value.LastName, "Jones", "The dictionary should be accessible by key.");
        });
        test("The call should fail with a \"TS.Collections.DuplicateKeyException\" for a key selector function which returns a duplicate key.", () => {
            let doubleElement = persEnum.elementAt(120);
            doubleElement.BusinessEntityID = 10802;
            doubleElement.FirstName = "No first name";
            doubleElement.LastName = "No last name";
            assert.throws(() => {
                let resultDict = TS_1.TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
            }, TS_1.TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for a key selector function which returns a duplicate key.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toArray(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toArray(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("toList", () => {
        let numList;
        test("Should return a list which has the same length as the original enumerable.", () => {
            numList = TS_1.TS.Linq.Extensions.toList(numEnum);
            assert.equal(numList.count(), numEnum.count(), "Should return a list which has the same length as the original enumerable.");
        });
        test("Should return an empty list for an empty enumeator.", () => {
            numList = TS_1.TS.Linq.Extensions.toList(numEnum);
            assert.equal(TS_1.TS.Linq.Extensions.toList(TS_1.TS.Linq.Enumerator.Empty).count(), 0, "Should return an empty list for an empty enumeator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toList(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.toList(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("union", () => {
        let emptyEnum;
        let carsEnum;
        let carsEnumResult;
        let carsArrayResult;
        let numEnum;
        test("Should return the expected result when called on numbers array without equality comparer.", () => {
            numEnum = TS_1.TS.Linq.Extensions.union([5, 3, 9, 7, 5, 9, 3, 7], [8, 3, 6, 4, 4, 9, 1, 0]);
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numEnum), [5, 3, 9, 7, 8, 6, 4, 1, 0], "Should return the expected result when called on numbers array without equality comparer.");
        });
        test("Should return all elements of both test arrays when called without an equality comparer.", () => {
            carsEnumResult = TS_1.TS.Linq.Extensions.union(createCarsArray(), createCarsUnionTestArray());
            carsArrayResult = TS_1.TS.Linq.Extensions.toArray(carsEnumResult);
            assert.equal(carsArrayResult.length, 10, "Should return all elements of both test arrays when called without an equality comparer.");
        });
        test("Should return only those elements of both test arrays which are uniqe when called with an equality comparer.", () => {
            carsEnumResult = TS_1.TS.Linq.Extensions.union(createCarsArray(), createCarsUnionTestArray(), (first, second) => first.name == second.name);
            carsArrayResult = TS_1.TS.Linq.Extensions.toArray(carsEnumResult);
            assert.equal(carsArrayResult.length, 8, "Should return only those elements of both test arrays which are uniqe when called with an equality comparer.");
        });
        test("Should return an empty enumerator when calle with empty enumerators.", () => {
            emptyEnum = TS_1.TS.Linq.Extensions.union(TS_1.TS.Linq.Enumerator.Empty, TS_1.TS.Linq.Enumerator.Empty);
            assert.equal(TS_1.TS.Linq.Extensions.count(emptyEnum), 0, "Should return an empty enumerator when calle with empty enumerators.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null first 'enumerator' argument.", () => {
            carsEnum = new TS_1.TS.Linq.Enumerator(createCarsArray());
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.union(null, carsEnum);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null first 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null second 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.union(carsEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null second 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined first 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.union(undefined, carsEnum);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined first 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.union(carsEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerator' argument.");
        });
    });
    suite("where", () => {
        let resultEnum;
        test("Should return the expected number of elements for the given query.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.where(persEnum, item => item.FirstName == "Bob");
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 1, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.where(persEnum, item => item.FirstName == "Michael");
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 5, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.where(persEnum, item => item.FirstName == "Edward");
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 3, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.where(persEnum, item => item.FirstName != "");
            assert.equal(TS_1.TS.Linq.Extensions.count(resultEnum), 400, "Should return the expected number of elements for the given query.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.where(null, (item) => item.FirstName != "");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.where(undefined, (item) => item.FirstName != "");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
    suite("zip", () => {
        let resultEnum;
        test("Should return a none empty enumeration.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.zip(numEnum, custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; });
            assert.notEqual(resultEnum, null, "Should return a none empty enumeration.");
        });
        test("Should returns as much elements as the shorter of both enumerations has.", () => {
            resultEnum = TS_1.TS.Linq.Extensions.zip(numEnum, custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; });
            assert.equal(resultEnum.count(), numEnum.count(), "Should returns as much elements as the shorter of both enumerations has.");
        });
        test("Should return an enumeration which contains elements of the expected type.", () => {
            let resultElement = TS_1.TS.Linq.Extensions.first(resultEnum);
            assert.ok((resultElement.number != undefined) && (resultElement.custID != undefined) && (resultElement.custFax != undefined), "Should return an enumeration which contains elements of the expected type.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnum' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(null, custEnum, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(numEnum, null, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(numEnum, custEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnum' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(undefined, custEnum, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(numEnum, undefined, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.zip(numEnum, custEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.");
        });
    });
});

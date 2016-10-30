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
var carEnum;
var strEnum;
var lowCharEnum;
var createStringArray;
var createNumberArray;
var createCarsArray;
var createCarsUnionTestArray;
var createProductArray;
var createSortTestArray;
var createRandomNumberArray;
var createCustomerArray;
suite("TS.Collections.List", () => {
    before(function () {
        // runs before all tests in this block
        custEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateCustomerArray());
        persEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreatePersonArray());
        ordEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateOrdersArray());
        numEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateNumberArray());
        carEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateCarsArray());
        strEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.CreateStringArray());
        lowCharEnum = new TS_1.TS.Linq.Enumerator(DATA.DATA.lowerCharArray);
        createNumberArray = DATA.DATA.CreateNumberArray;
        createStringArray = DATA.DATA.CreateStringArray;
        createCarsArray = DATA.DATA.CreateCarsArray;
        createCarsUnionTestArray = DATA.DATA.CreateCarsUnionTestArray;
        createProductArray = DATA.DATA.CreateProductArray;
        createSortTestArray = DATA.DATA.CreateSortTestArray;
        createRandomNumberArray = DATA.DATA.CreateRandomNumberArray;
        createCustomerArray = DATA.DATA.CreateCustomerArray;
    });
    suite("constructor", () => {
        let List;
        let nullIndex;
        test("A call to the constructor should return an object.", () => {
            List = new TS_1.TS.Collections.List(true);
            List.count();
            assert.notEqual(List, null, "A call to the constructor should return an object.");
        });
        test("The returned object should be iterable.", () => {
            List = new TS_1.TS.Collections.List(true);
            List.count();
            assert.ok(TS_1.TS.Utils.Assert.isIterable(List), "The returned object should be iterable.");
        });
        test("The returned collection should be empty.", () => {
            List = new TS_1.TS.Collections.List(true);
            List.count();
            assert.equal(TS_1.TS.Linq.Extensions.count(List), 0, "The returned collection should be empty.");
        });
        test("A call to the constructor should return an object.", () => {
            List = new TS_1.TS.Collections.List(true, [1, 2, 3, null, 4, null, 6]);
            assert.notEqual(List, null, "A call to the constructor should return an object.");
        });
        test("The returned object should be iterable.", () => {
            List = new TS_1.TS.Collections.List(true, [1, 2, 3, null, 4, null, 6]);
            assert.ok(TS_1.TS.Utils.Assert.isIterable(List), "The returned object should be iterable.");
        });
        test("The returned collection should have as much elements as expected.", () => {
            List = new TS_1.TS.Collections.List(true, [1, 2, 3, null, 4, null, 6]);
            assert.equal(TS_1.TS.Linq.Extensions.count(List), 7, "The returned collection should have as much elements as expected.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a call to the constructor with an array which holds null values when 'allowNull' is set to false.", () => {
            assert.throws(() => {
                List = new TS_1.TS.Collections.List(false, [1, 2, 3, null, 4, null]);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call to the constructor with an array which holds null values when 'allowNull' is set to false.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call to the constructor with an invalid 'allowNull' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(null, TS_1.TS.Linq.Enumerator.Empty);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call to the constructor with a null 'allowNull' argument.");
        });
    });
    suite("add", () => {
        let numList;
        test("The list should have the expected number of elements. The list elements should match with the source elements.", () => {
            numList = new TS_1.TS.Collections.List(true);
            for (let item of numEnum) {
                numList.add(item);
            }
            assert.equal(TS_1.TS.Linq.Extensions.count(numList), TS_1.TS.Linq.Extensions.count(numEnum), "The list should have the expected number of elements.");
            assert.deepEqual(TS_1.TS.Linq.Extensions.toArray(numList), TS_1.TS.Linq.Extensions.toArray(numEnum), "The list elements should match with the source elements.");
        });
        test("The list should hold as much elements as expected.", () => {
            numList = new TS_1.TS.Collections.List(true);
            for (let item of numEnum) {
                numList.add(item);
            }
            numList.add(null);
            assert.deepEqual(TS_1.TS.Linq.Extensions.count(numList), TS_1.TS.Linq.Extensions.count(numEnum) + 1, "The list should hold as much elements as expected.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an attempt to add a null value on a list which has the 'allowNull' flag set to false.", () => {
            numList = new TS_1.TS.Collections.List(false);
            for (let item of numEnum) {
                numList.add(item);
            }
            assert.throws(() => {
                numList.add(null);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an attempt to add a null value on a list which has the 'allowNull' flag set to false.");
        });
    });
    suite("aggregate", () => {
        let numberResult;
        let stringResult;
        let carNumberResult;
        let carStringResult;
        let numList;
        let strList;
        let carList;
        test("should return '55' on TS.Linq.Enumerator<number>.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numberResult = numList.aggregate((first, second) => {
                return first + second;
            });
            assert.equal(numberResult, 55, "should return '55' on TS.Linq.Enumerator<number>.");
        });
        test("Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on List<string>.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            stringResult = strList.aggregate((first, second) => {
                return first + ", " + second;
            });
            assert.equal(stringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on List<string> .");
        });
        test("Should return 595 on a List<DATA.Car> with an accumulator function on 'horsePower' and a seed value of '0'.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            carNumberResult = carList.aggregate((first, second) => first + second.horsePower, 0);
            assert.equal(carNumberResult, 595, "Should return 595 on a List<DATA.Car> with an accumulator function on 'horsePower' and a seed value of '0'.");
        });
        test("Should return 'BMWAUDIVWFIATTRABANT' on a List<DATA.Car> with an accumulator function on 'name' and a seed value of \"\".", () => {
            carStringResult = carList.aggregate((first, second) => first + second.name, "");
            assert.equal(carStringResult, "BMWAUDIVWFIATTRABANT", "Should return 'BMWAUDIVWFIATTRABANT' on a List<DATA.Car> with an accumulator function on 'name' and a seed value of \"\".");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(true).aggregate((first, second) => { return first + second; });
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.", () => {
            assert.throws(() => {
                carList.aggregate(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.", () => {
            assert.throws(() => {
                carList.aggregate(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.");
        });
    });
    suite("all", () => {
        let numList;
        let strList;
        let carList;
        test("Should return true on a predicate that should pass.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.ok(carList.all(item => item.horsePower > 10), "Should return true on a predicate that should pass.");
        });
        test("Should return true on a predicate that should pass.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(strList.all(item => item.length > 2), "Should return true on a predicate that should pass.");
        });
        test("Should return true on a predicate that should pass.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(numList.all(item => item > -1), "Should return true on a predicate that should pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.ok(!carList.all(item => item.disel), "Should return false on a predicate that shouldn't pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(!strList.all(item => item.indexOf("o") > -1), "Should return false on a predicate that shouldn't pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(!numList.all(item => (item % 2) > 0), "Should return false on a predicate that shouldn't pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            numList = new TS_1.TS.Collections.List(true, [1, null, 3, 4, null, 5, 6, null, 7]);
            assert.ok(!numList.all(item => (item % 2) > 0), "Should return false on a predicate that shouldn't pass.");
        });
        test("The call should fail with a \"TypeError\" for an attempt to read a property on a null value.", () => {
            strList = new TS_1.TS.Collections.List(true, ["one", null, "two", "three", null, "four", "five", null, "six"]);
            assert.throws(() => {
                strList.all(item => item.length > 2);
            }, TypeError, "The call should fail with a \"TypeError\" for an attempt to read a property on a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => {
            assert.throws(() => {
                strList.all(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => {
            assert.throws(() => {
                strList.all(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
        });
    });
    suite("any", () => {
        test("Should return false on an empty 'enumerator'.", () => {
            assert.equal(new TS_1.TS.Collections.List(false).any(item => true), false, "Should return false on an empty 'enumerator'.");
        });
        test("Should return true on a predicate that should pass.", () => {
            assert.ok(new TS_1.TS.Collections.List(false, strEnum).any(item => item.length >= 3), "Should return true on a predicate that should pass.");
        });
        test("Should return false on a predicate that shouldn't pass.", () => {
            assert.ok(!new TS_1.TS.Collections.List(false, strEnum).any(item => item.length < 2), "Should return false on a predicate that shouldn't pass.");
        });
        test("Should return true on a none empty 'List' without predicate.", () => {
            assert.ok(new TS_1.TS.Collections.List(false, numEnum).any(), "Should return true on a none empty 'List' without predicate.");
        });
        test("Should return false on an empty 'List' without predicate.", () => {
            assert.ok(!new TS_1.TS.Collections.List(false).any(), "Should return false on an empty 'List' without predicate.");
        });
    });
    suite("average", () => {
        let testNumberArray;
        let List;
        test("Should return the expected average.", () => {
            assert.equal(new TS_1.TS.Collections.List(false, numEnum).average(), 5.5, "Should return the expected average.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'List' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false).average();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'List' argument.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which elements sum exceedes the number range.", () => {
            testNumberArray = createNumberArray();
            testNumberArray.push(Number.MAX_VALUE / 2);
            testNumberArray.push(Number.MAX_VALUE);
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, testNumberArray).average();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which elements sum exceedes the number range.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which holds null values range.", () => {
            assert.throws(() => {
                List = new TS_1.TS.Collections.List(true, [1, 2, 3, null, 4, null]);
                List.average();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which holds null values");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an 'List<string>' which don't allow to calculate an average..", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, strEnum).average();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<string>' which don't allow to calculate an average.");
        });
    });
    suite("concat", () => {
        let numList;
        let strList;
        test("Should return the expected result of the concatenation.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList = numList.concat(numEnum).toList();
            assert.deepEqual(numList.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return the expected result of the concatenation.");
        });
        test("Should return the expected result of the concatenation.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            strList = strList.concat(strEnum).toList();
            assert.deepEqual(strList.toArray(), ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return the expected result of the concatenation.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                strList.concat(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                strList.concat(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("contains", () => {
        let numList;
        let strList;
        test("Should return true for a contained value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(numList.contains(5), "Should return true for a contained value.");
        });
        test("Should return true for a contained value.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(strList.contains("six"), "Should return true for a contained value.");
        });
        test("Should return false for a value not contained.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(!numList.contains(200), "Should return false for a value not contained.");
        });
        test("Should return false for a value not contained.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(!strList.contains("nop"), "Should return false for a value not contained.");
        });
        test("Should return true when using a matching equality comparer.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(strList.contains("nop", (first, second) => true), "Should return true when using a matching equality comparer.");
        });
        test("Should return false when using a not matching equality comparer.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.ok(!strList.contains("one", (first, second) => first == "yes"), "Should return false when using a not matching equality comparer.");
        });
    });
    suite("copyTo", () => {
        let strList;
        let resultArray;
        let controlArray;
        test("Schould return an array with a matching size. The array should match with the source array.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            resultArray = new Array();
            strList.copyTo(resultArray);
            assert.equal(resultArray.length, strList.length, "Schould return an array with a matching size.");
            assert.deepEqual(resultArray, createStringArray(), "The array should match with the source array.");
        });
        test("The array should match with the controlArray array after a second copy operation.", () => {
            controlArray = ["one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
            strList = new TS_1.TS.Collections.List(false, strEnum);
            resultArray = new Array();
            strList.copyTo(resultArray);
            strList.copyTo(resultArray, 5);
            assert.deepEqual(resultArray, controlArray, "The array should match with the controlArray array after a second copy operation.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.", () => {
            assert.throws(() => {
                strList.copyTo(resultArray, -1);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.", () => {
            assert.throws(() => {
                strList.copyTo(resultArray, resultArray.length + 1);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'targetArray' argument.", () => {
            assert.throws(() => {
                strList.copyTo(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'targetArray' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'targetArray' argument.", () => {
            assert.throws(() => {
                strList.copyTo(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'targetArray' argument.");
        });
    });
    suite("count", () => {
        let numList;
        let strList;
        test("Schould return a number which matches with the source array length.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.count(), 10, "Schould return a number which matches with the source array length.");
        });
        test("Schould return a number which matches with the source array length.", () => {
            strList = new TS_1.TS.Collections.List(false, strEnum);
            assert.equal(strList.count(), 10, "Schould return a number which matches with the source array length.");
        });
        test("Should return a number which reflects the new list length.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.add(99);
            assert.equal(numList.count(), 11, "Should return a number which reflects the new list length.");
        });
        test("Should return a number which reflects the new list length.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.removeAt(0).removeAt(0).count(), 8, "Should return a number which reflects the new list length.");
        });
        test("Should return 0 for an empty list.", () => {
            assert.equal(new TS_1.TS.Collections.List(false).count(), 0, "Should return 0 for an empty list.");
        });
    });
    suite("cycle", () => {
        let numList;
        test("The result list should match with the control array.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.deepEqual(numList.cycle().take(20).toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "The result list should match with the control array.");
        });
        test("The result list should match with the control string.", () => {
            assert.deepEqual(new TS_1.TS.Collections.List(false, ["a", "b", "c"]).cycle().take(9).toArray().join(), "a,b,c,a,b,c,a,b,c", "The result list should match with the control string.");
        });
    });
    suite("defaultIfEmpty", () => {
        let numList;
        let carList;
        test("The result should match with the default primitive type.", () => {
            numList = new TS_1.TS.Collections.List(false);
            assert.deepEqual(numList.defaultIfEmpty(0).toArray(), [0], "The result should match with the default primitive type.");
        });
        test("The result should match with the default complex type.", () => {
            carList = new TS_1.TS.Collections.List(false);
            assert.deepEqual(carList.defaultIfEmpty(DATA.DATA.Car).toArray(), [new DATA.DATA.Car()], "The result should match with the default complex type.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                numList.defaultIfEmpty(null).toArray();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                numList.defaultIfEmpty(undefined).toArray();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.");
        });
    });
    suite("distinct", () => {
        let numList;
        let resultCarList;
        let doubleCarList;
        test("Should return list with the expected elements.", () => {
            doubleCarList = new TS_1.TS.Collections.List(false, carEnum).add(...createCarsArray());
            resultCarList = doubleCarList.distinct((first, second) => first.name == second.name).toList();
            assert.deepEqual(resultCarList.toArray(), createCarsArray(), "Should return list with the expected elements.");
        });
        test("Should return a list with the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, [0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9]).distinct().toList();
            assert.equal(numList.count(), 10, "Should return a list with the expected number of elements.");
        });
    });
    suite("elementAt", () => {
        let numList;
        let carList;
        test("The element on the viewed position should matcj with the expected value.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.elementAt(3), createCarsArray()[3], "The element on the viewed position should matcj with the expected value.");
        });
        test("The element on the viewed position should match with the expected value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.elementAt(9), 10, "The element on the viewed position should match with the expected value.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'index' argument.", () => {
            assert.throws(() => {
                numList.elementAt(-3);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'index' argument.");
        });
        test("The call should fail with a \"TS.IndexOutOfRangeException\" for an 'index' argument which is out of the range of the enumeration.", () => {
            assert.throws(() => {
                numList.elementAt(200);
            }, TS_1.TS.IndexOutOfRangeException, "The call should fail with a \"TS.IndexOutOfRangeException\" for an 'index' argument which is out of the range of the enumeration.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.", () => {
            assert.throws(() => {
                numList.elementAt(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.", () => {
            assert.throws(() => {
                numList.elementAt(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
        });
    });
    suite("elementAtOrDefault", () => {
        let numList;
        let carList;
        test("The element on the viewed position should matct with the expected value.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.elementAtOrDefault(3, DATA.DATA.Car), createCarsArray()[3], "The element on the viewed position should matct with the expected value.");
        });
        test("The element on the viewed position should match with the expected value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.elementAtOrDefault(9, 0), 10, "The element on the viewed position should match with the expected value.");
        });
        test("The default element should be returned.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.elementAtOrDefault(15, DATA.DATA.Car), new DATA.DATA.Car(), "The default element should be returned.");
        });
        test("The default element should be returned.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.elementAtOrDefault(99, 11), 11, "The default element should be returned.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.", () => {
            assert.throws(() => {
                carList.elementAtOrDefault(-1, DATA.DATA.Car);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                numList.elementAtOrDefault(3, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.", () => {
            assert.throws(() => {
                numList.elementAtOrDefault(3, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
        });
    });
    suite("except", () => {
        let strList;
        test("Should return a collection with the expected elements.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.except(lowCharEnum).toArray(), ["A", "B", "C", "D", "E", "F", "G"], "Should return a collection with the expected elements.");
        });
        test("Should return an unchanged collection with 'secondEnumerator' which has no match.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.except(["x", "2", "?"]).toArray(), ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"], "Should return an unchanged collection with 'secondEnumerator' which has no match.");
        });
        test("Should return an empty collection whenn called with an identic collection.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.except(strList).toArray(), [], "Should return an empty collection whenn called with an identic collection.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                strList.except(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                strList.except(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("first", () => {
        let strList;
        let carList;
        test("Should return the first element in the sequence.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.first(), "a", "Should return the first element in the sequence.");
        });
        test("Should return the first element in the sequence.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.first(), carList[0], "Should return the first element in the sequence.");
        });
        test("Should return the first matching element in the sequence.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.first(item => item == "F"), "F", "Should return the first matching element in the sequence.");
        });
        test("Should return the first matching element in the sequence.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.first(item => item.name == "FIAT"), { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 }, "Should return the first matching element in the sequence.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which hasn't a match.", () => {
            assert.throws(() => {
                strList.first(item => item == "X");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which hasn't a match.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an empty list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).first();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty list.");
        });
    });
    suite("firstOrDefault", () => {
        let strList;
        let carList;
        test("Should return the first element in the sequence.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.firstOrDefault("x"), "a", "Should return the first element in the sequence.");
        });
        test("Should return the first element in the sequence.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.firstOrDefault(DATA.DATA.Car), carList[0], "Should return the first element in the sequence.");
        });
        test("Should return the first matching element in the sequence.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.firstOrDefault("x", item => item == "g"), "g", "Should return the first matching element in the sequence.");
        });
        test("Should return the first matching element in the sequence.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.firstOrDefault(DATA.DATA.Car, item => item.name == "FIAT"), { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 }, "Should return the first matching element in the sequence.");
        });
        test("Should return the default element for a predicate which hans't a match.", () => {
            strList = new TS_1.TS.Collections.List(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);
            assert.deepEqual(strList.firstOrDefault("x", item => item == "?"), "x", "Should return the default element for a predicate which hans't a match.");
        });
        test("Should return the default element for a predicate which hans't a match.", () => {
            carList = new TS_1.TS.Collections.List(false, carEnum);
            assert.deepEqual(carList.firstOrDefault(DATA.DATA.Car, item => item.name == "WHAT"), new DATA.DATA.Car(), "Should return the default element for a predicate which hans't a match.");
        });
        test("Should return the default element for an empty sequence.", () => {
            assert.deepEqual(strList.clear().firstOrDefault("z"), "z", "Should return the default element for an empty sequence.");
        });
        test("Should return the default element for an empty sequence.", () => {
            assert.deepEqual(carList.clear().firstOrDefault(DATA.DATA.Car, item => item.name == "FIAT"), new DATA.DATA.Car, "Should return the default element for an empty sequence.");
        });
    });
    suite("forEach", () => {
        let numList;
        let cusList;
        let addAndSum;
        test("Should have no effect when called on a list of value types. The summed up value should be greater than 100.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            addAndSum = 0;
            assert.deepEqual(numList.forEach(item => { item += 10; addAndSum += item; }).toArray(), createNumberArray(), "Should have no effect when called on a list of value types.");
            assert.ok(addAndSum > 100, "The summed up value should be greater than 100.");
        });
        test("Should effect each element when called on a list of reference types.", () => {
            cusList = new TS_1.TS.Collections.List(false, createCustomerArray());
            assert.deepEqual(cusList.forEach(item => item.ContactName = "NO").where(item => item.ContactName != "NO").count(), 0, "Should effect each element when called on a list of reference types.");
        });
    });
    suite("groupBy", () => {
        let cusResultList;
        let resultProdList;
        let resultProdListStorageRoom;
        let resultProdListStorageRoomConcat;
        test("Should return 21 elements for the executed expression.", () => {
            cusResultList = new TS_1.TS.Collections.List(false, custEnum).groupBy(_CUST => _CUST.Country).toList();
            assert.equal(cusResultList.count(), 21, "Should return 21 elements for the executed expression.");
        });
        test("Should return 5 elements for the executed expression with equalityComparer.", () => {
            resultProdList = new TS_1.TS.Collections.List(false, createProductArray()).groupBy(item => TS_1.TS.Utils.findSingleCurrency(item.Currency).Code).toList();
            assert.equal(resultProdList.count(), 5, "Should return 5 elements for the executed expression with equalityComparer.");
        });
        //for (let outerItem of resultProdList)
        //{
        //  console.log("***************************************************");
        //  console.log(JSON.stringify(outerItem));
        //  console.log("***************************************************");
        //  for (let innerItem of outerItem)
        //  {
        //    console.log("  " + JSON.stringify(innerItem));
        //  }
        //}
        test("Should return 5 elements for the executed expression with elementSelector.", () => {
            function equComp(first, second) {
                return TS_1.TS.Utils.findSingleCurrency(first).Code === TS_1.TS.Utils.findSingleCurrency(second).Code;
            }
            resultProdListStorageRoom = new TS_1.TS.Collections.List(false, createProductArray()).groupBy(item => TS_1.TS.Utils.findSingleCurrency(item.Currency).Code, equComp, (item) => item.Storage.Room).toList();
            assert.equal(resultProdListStorageRoom.count(), 5, "Should return 5 elements for the executed expression with elementSelector.");
        });
        //for (let outerItem of resultProdListStorageRoom)
        //{
        //  console.log("***************************************************");
        //  console.log(JSON.stringify(outerItem));
        //  console.log("***************************************************");
        //  for (let innerItem of outerItem)
        //  {
        //    console.log("  " + JSON.stringify(innerItem));
        //  }
        //}
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).groupBy(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).groupBy(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.");
        });
    });
    suite("groupJoin", () => {
        let cusList;
        let ordersCount;
        //Run the following query in 'LinqPad' against the 'NORTHWND' database.
        //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
        //The query will return 91 Results.
        test("Should return 91 elements for the executed expression.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            let result = cusList.groupJoin(ordEnum, (OuterItem) => OuterItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group })).toList();
            assert.equal(result.count(), 91, "Should return 91 elements for the executed expression.");
        });
        test("Should return 830 order records for the executed expression.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            let result = cusList.groupJoin(ordEnum, (OuterItem) => OuterItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group })).toList();
            ordersCount = 0;
            for (let item of result) {
                //console.log("***************************************************");
                //console.log(JSON.stringify(item));
                //console.log("***************************************************");
                for (let order of item.OrderGroup) {
                    ordersCount++;
                }
            }
            assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");
        });
        //
        //Execute the query once again but using the 'equalityComparer' instead of the default comparer.
        //Should return the same result.
        //
        test("Should return 91 elements for the executed expression.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            let result = cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey, innerKey) => outerKey == innerKey).toList();
            assert.equal(result.count(), 91, "Should return 91 elements for the executed expression.");
        });
        test("Should return 830 order records for the executed expression.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            let result = cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey, innerKey) => outerKey == innerKey).toList();
            ordersCount = 0;
            for (let item of result) {
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
                cusList.groupJoin(ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.groupJoin(ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () => {
            assert.throws(() => {
                cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () => {
            assert.throws(() => {
                cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
        });
    });
    suite("indexOf", () => {
        let numList;
        let cusList;
        let searchItem;
        let foundIndex;
        test("The returned value should be the expected position.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.indexOf(5), 4, "The returned value should be the expected position.");
        });
        test("The returned value should be the first position of the element in the sequence.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.add(5);
            assert.equal(numList.indexOf(5), 4, "The returned value should be the first position of the element in the sequence.");
        });
        test("The returned value should be the second position of the element in the sequence.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.add(5);
            assert.equal(numList.indexOf(5, 5), 10, "The returned value should be the second position of the element in the sequence.");
        });
        test("The returned value should be the expected position.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            searchItem = createCustomerArray()[4];
            foundIndex = cusList.indexOf(searchItem, 0, (first, second) => first.CustomerID == second.CustomerID);
            assert.equal(foundIndex, 4, "The returned value should be the expected position.");
        });
        test("The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(true, TS_1.TS.Linq.Enumerator.Empty).indexOf(undefined);
            }, TS_1.TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.", () => {
            assert.throws(() => {
                cusList.indexOf(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.", () => {
            assert.throws(() => {
                cusList.indexOf(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'startIndex' argument.", () => {
            assert.throws(() => {
                cusList.indexOf(searchItem, -1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'startIndex' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a 'startIndex' argument which is not an integer value.", () => {
            assert.throws(() => {
                cusList.indexOf(searchItem, 2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'startIndex' argument which is not an integer value.");
        });
    });
    suite("insert", () => {
        let numList;
        test("The new inserted item should be found at the expected position.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.insert(4, 99).indexOf(99), 4, "The new inserted item should be found at the expected position.");
        });
        test("The list should have one more element than the original source list.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.insert(4, 99);
            assert.ok(numList.count() == numEnum.count() + 1, "The list should have one more element than the original source list.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for an 'index' argument which is out of the range of the list.", () => {
            assert.throws(() => {
                numList.insert(99, 11);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an 'index' argument which is out of the range of the list.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a nagative 'index' argument.", () => {
            assert.throws(() => {
                numList.insert(-1, 11);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a nagative 'index' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an 'index' argument which is not an integer.", () => {
            assert.throws(() => {
                numList.insert(2.5, 11);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an 'index' argument which is not an integer.");
        });
        test("The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(true, TS_1.TS.Linq.Enumerator.Empty).insert(0, undefined);
            }, TS_1.TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).insert(0, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).insert(0, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.");
        });
    });
    suite("intersect", () => {
        let numList;
        let cusList;
        let cusIntersectArray;
        test("Should return the expected sequence.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList = numList.intersect([2, 4, 6, 8, 10, 12, 14]).toList();
            assert.deepEqual(numList.toArray(), [2, 4, 6, 8, 10], "Should return the expected sequence.");
        });
        test("Should return the expected sequence.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            cusIntersectArray = new Array();
            cusIntersectArray.push(createCustomerArray()[12]);
            cusIntersectArray.push(createCustomerArray()[44]);
            cusIntersectArray.push(createCustomerArray()[78]);
            cusList = cusList.intersect(cusIntersectArray, (first, second) => first.CustomerID == second.CustomerID).toList();
            assert.deepEqual(cusList.toArray(), cusIntersectArray, "Should return the expected sequence.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                numList.intersect(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                numList.intersect(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("join", () => {
        let cusList;
        test("Should return 830 records for the executed expression.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            let joinList = cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry })).toList();
            assert.equal(joinList.count(), 830, "Should return 830 records for the executed expression.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.", () => {
            assert.throws(() => {
                cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
        });
    });
    suite("last", () => {
        let numList;
        let ordList;
        test("Should return the expected element.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.last(), 10, "Should return the expected element.");
        });
        test("Should return the expected element.", () => {
            ordList = new TS_1.TS.Collections.List(false, ordEnum);
            assert.equal(ordList.last(item => item.CustomerID == "GODOS").OrderID, 11037, "Should return the expected element.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an 'predicate' argument which has no match.", () => {
            assert.throws(() => {
                ordList.last(item => item.CustomerID == "NO_SUCH_CUSTOMER");
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'predicate' argument which has no match.");
        });
    });
    suite("lastOrDefault", () => {
        let numList;
        let ordList;
        test("Should return the expected element.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.lastOrDefault(0), 10, "Should return the expected element.");
        });
        test("Should return the default element.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.lastOrDefault(0, item => item > 100), 0, "Should return the default element.");
        });
        test("Should return the expected element.", () => {
            ordList = new TS_1.TS.Collections.List(false, ordEnum);
            assert.equal(ordList.lastOrDefault(DATA.DATA.Order, item => item.CustomerID == "GODOS").OrderID, 11037, "Should return the expected element.");
        });
        test("Should return the default element.", () => {
            ordList = new TS_1.TS.Collections.List(false, ordEnum);
            assert.equal(ordList.lastOrDefault(DATA.DATA.Order, item => item.CustomerID == "NO_SUCH_CUSTOMER").OrderID, 0, "Should return the default element.");
        });
    });
    suite("length", () => {
        let numList;
        test("Should return the expected length", () => {
            numList = new TS_1.TS.Collections.List(true, [1, 2, null, 4, 5, null, 7]);
            assert.equal(numList.length, 7, "Should return the expected length");
        });
        test("Should return the expected length", () => {
            numList = new TS_1.TS.Collections.List(true, [1, 2, null, 4, 5, null, 7]);
            numList.add(8);
            assert.equal(numList.length, 8, "Should return the expected length");
        });
        test("Should return the expected length", () => {
            numList = new TS_1.TS.Collections.List(true, [1, 2, null, 4, 5, null, 7]);
            numList.remove(0).remove(0);
            assert.equal(numList.length, 5, "Should return the expected length");
        });
        test("Should return the expected length", () => {
            numList = new TS_1.TS.Collections.List(true, [1, 2, null, 4, 5, null, 7]);
            numList.clear();
            assert.equal(numList.length, 0, "Should return the expected length");
        });
    });
    suite("max", () => {
        let numList;
        let ordList;
        test("Should return the expected value", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.max(), 10, "Should return the expected value");
        });
        test("Should return the expected value", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.insert(5, 99);
            assert.equal(numList.max(), 99, "Should return the expected value");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.clear();
            assert.throws(() => {
                numList.max();
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.", () => {
            ordList = new TS_1.TS.Collections.List(false, ordEnum);
            assert.throws(() => {
                ordList.max();
            }, TS_1.TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.");
        });
    });
    suite("min", () => {
        let numList;
        let ordList;
        test("Should return the expected value", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.min(), 1, "Should return the expected value");
        });
        test("Should return the expected value", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.insert(5, -99);
            assert.equal(numList.min(), -99, "Should return the expected value");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            numList.clear();
            assert.throws(() => {
                numList.min();
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.", () => {
            ordList = new TS_1.TS.Collections.List(false, ordEnum);
            assert.throws(() => {
                ordList.min();
            }, TS_1.TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.");
        });
    });
    suite("orderBy", () => {
        let sortTestList;
        let orderCorrect;
        let lastItem;
        let cusList;
        test("The result sequence should have the same size as the source sequence.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderBy(item => item.color);
            let resultList = resultOrder.toList();
            assert.equal(resultList.length, sortTestList.count(), "The result sequence should have the same size as the source sequence.");
        });
        test("Should returns a list of sort test items sorted by color in ascending order.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderBy(item => item.color);
            orderCorrect = true;
            lastItem = null;
            for (let item of resultOrder) {
                if ((lastItem != null) && (item.color < lastItem.color)) {
                    orderCorrect = false;
                }
                lastItem = item;
            } //END for
            assert.ok(orderCorrect, "Should returns a list of sort test items sorted by color in ascending order.");
        });
        test("The orderedEnumerator should hold three partitions for the different colors found during last sort.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderBy(item => item.color);
            let partIter = resultOrder.partitionIterator();
            let partCount = 0;
            let partIterResult = partIter.next();
            while (!partIterResult.done) {
                partCount++;
                partIterResult = partIter.next();
            }
            assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");
        });
        test("Should returns a list of numbers sorted in ascending order.", () => {
            let numList = new TS_1.TS.Collections.List(false, createRandomNumberArray(100)).orderBy(item => item).toList();
            orderCorrect = true;
            let lastNumber = 0;
            for (let item of numList) {
                if (item < lastNumber) {
                    orderCorrect = false;
                }
                lastNumber = item;
            } //END for
            assert.ok(orderCorrect, "Should returns a list of numbers sorted in ascending order.");
        });
        test("Should returns an list of customers sorted by country in ascending order.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            cusList = cusList.orderBy(item => item.Country, (first, second) => first.localeCompare(second)).toList();
            let lastCusItem = null;
            for (let item of cusList) {
                if ((lastCusItem != null) && (item.Country < lastCusItem.Country)) {
                    orderCorrect = false;
                }
                lastCusItem = item;
            } //END for
            assert.ok(orderCorrect, "Should returns an list of customers sorted by country in ascending order.");
        });
        test("A call to 'orderBy' on an empty list should return an empty list.", () => {
            let emptyList = new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderBy(item => item).toList();
            assert.equal(emptyList.count(), 0, "A call to 'orderBy' on an empty list should return an empty list.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderBy(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderBy(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("orderByDescending", () => {
        let sortTestList;
        let orderCorrect;
        let lastItem;
        let cusList;
        test("The result sequence should have the same size as the source sequence.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderByDescending(item => item.color);
            let resultList = resultOrder.toList();
            assert.equal(resultList.length, sortTestList.count(), "The result sequence should have the same size as the source sequence.");
        });
        test("Should returns a list of sort test items sorted by color in descending order.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderByDescending(item => item.color);
            orderCorrect = true;
            lastItem = null;
            for (let item of resultOrder) {
                if ((lastItem != null) && (item.color > lastItem.color)) {
                    orderCorrect = false;
                }
                lastItem = item;
            } //END for
            assert.ok(orderCorrect, "Should returns a list of sort test items sorted by color in descending order.");
        });
        test("The orderedEnumerator should hold three partitions for the different colors found during last sort.", () => {
            sortTestList = new TS_1.TS.Collections.List(false, createSortTestArray());
            let resultOrder = sortTestList.orderByDescending(item => item.color);
            let partIter = resultOrder.partitionIterator();
            let partCount = 0;
            let partIterResult = partIter.next();
            while (!partIterResult.done) {
                partCount++;
                partIterResult = partIter.next();
            }
            assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");
        });
        test("Should returns a list of numbers sorted in descending order.", () => {
            let numList = new TS_1.TS.Collections.List(false, createRandomNumberArray(100)).orderByDescending(item => item).toList();
            orderCorrect = true;
            let lastNumber = 100;
            for (let item of numList) {
                if (item > lastNumber) {
                    orderCorrect = false;
                }
                lastNumber = item;
            } //END for
            assert.ok(orderCorrect, "Should returns a list of numbers sorted in descending order.");
        });
        test("Should returns an list of customers sorted by country in descending order.", () => {
            cusList = new TS_1.TS.Collections.List(false, custEnum);
            cusList = cusList.orderByDescending(item => item.Country, (first, second) => first.localeCompare(second)).toList();
            let lastCusItem = null;
            for (let item of cusList) {
                if ((lastCusItem != null) && (item.Country > lastCusItem.Country)) {
                    orderCorrect = false;
                }
                lastCusItem = item;
            } //END for
            assert.ok(orderCorrect, "Should returns an list of customers sorted by country in descending order.");
        });
        test("A call to 'orderByDescending' on an empty list should return an empty list.", () => {
            let emptyList = new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderByDescending(item => item).toList();
            assert.equal(emptyList.count(), 0, "A call to 'orderByDescending' on an empty list should return an empty list.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderByDescending(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).orderByDescending(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("random", () => {
        let strList;
        let isRandom = false;
        test("Should return a string array in random order.", () => {
            strList = new TS_1.TS.Collections.List(false, createStringArray()).random().take(50).toList();
            let lastItem = null;
            for (let item of strList) {
                if ((lastItem != null) && (lastItem != item)) {
                    isRandom = true;
                }
                lastItem = item;
            }
            assert.ok(isRandom, "Should return a string array in random order.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).random().first();
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty list.");
        });
    });
    suite("reverse", () => {
        let numList;
        let isReverse;
        let numArray;
        test("Should return a sequence in reverse order.", () => {
            numArray = numEnum.toArray();
            numList = new TS_1.TS.Collections.List(false, numEnum).reverse().toList();
            isReverse = true;
            for (let index = 0; index < numList.length; index++) {
                if (!(numList[index] == numArray[numArray.length - 1 - index])) {
                    isReverse = false;
                }
            }
            assert.equal(isReverse, true, "Should return a sequence in reverse order.");
        });
        test("Should return an empty list for a call to reverse on an empty sequence.", () => {
            numList = new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).reverse().toList();
            assert.equal(numList.length, 0, "Should return an empty list for a call to reverse on an empty sequence.");
        });
    });
    suite("select", () => {
        let expensiveCount;
        test("Should return 2 elements of the expected projection type.", () => {
            let resultList = new TS_1.TS.Collections.List(false, createCarsArray()).select(item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") })).toList();
            expensiveCount = 0;
            for (let item of resultList) {
                if (item.expensive == "yes") {
                    expensiveCount++;
                } //END if
            } //END for
            assert.equal(expensiveCount, 2, "Should return 2 elements of the expected projection type.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an invalid 'selector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, ["", 1]).select(item => item.NOP).first();
            }, TS_1.TS.Linq.SelectorException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an invalid 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            let resultList = new TS_1.TS.Collections.List(false, createCarsArray()).select(item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") })).toList();
            assert.throws(() => {
                resultList.select(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            let resultList = new TS_1.TS.Collections.List(false, createCarsArray()).select(item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") })).toList();
            assert.throws(() => {
                resultList.select(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("selectMany", () => {
        test("The number of elements in the selctMany result and the orders table should match.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).selectMany(customer => {
                return new TS_1.TS.Collections.List(false, ordEnum).where(order => order.CustomerID == customer.CustomerID);
            });
            assert.equal(result.count(), ordEnum.count(), "The number of elements in the selctMany result and the orders table should match.");
        });
        test("The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, ["", 1]).selectMany(item => item.NOP).first();
            }, TS_1.TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).selectMany(customer => {
                return new TS_1.TS.Collections.List(false, ordEnum).where(order => order.CustomerID == customer.CustomerID);
            });
            assert.throws(() => {
                result.toList().selectMany(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).selectMany(customer => {
                return new TS_1.TS.Collections.List(false, ordEnum).where(order => order.CustomerID == customer.CustomerID);
            });
            assert.throws(() => {
                result.toList().selectMany(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
        });
    });
    suite("sequenceEqual", () => {
        let numList;
        test("The number list should be equal to the source number enumeration.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(numList.sequenceEqual(numEnum), "The number list should be equal to the source number enumeration.");
        });
        test("The modified number list should not be equal to the source number enumeration.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.ok(!numList.insert(5, 99).sequenceEqual(numEnum), "The modified number list should not be equal to the source number enumeration.");
        });
        test("The empty list should be equal to any empty iterable sequence.", () => {
            assert.ok(new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).sequenceEqual([]), "The empty list should be equal to any empty iterable sequence.");
        });
        test("The empty list should not be equal to a not empty iterable sequence.", () => {
            assert.ok(!new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).sequenceEqual([1]), "The empty list should not be equal to a not empty iterable sequence.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                numList.sequenceEqual(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                numList.sequenceEqual(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("shuffle", () => {
        test("Should return a result enumerator with the same length as the source array.", () => {
            let result = new TS_1.TS.Collections.List(false, numEnum).shuffle().toList();
            assert.equal(result.count(), createNumberArray().length, "Should return a result enumerator with the same length as the source array.");
        });
        test("Should return a shuffled enumerator which doesn't be equal to the source enumerator", () => {
            let result = new TS_1.TS.Collections.List(false, numEnum).shuffle().toList();
            assert.notDeepEqual(result.toArray(), createNumberArray(), "Should return a shuffled enumerator which doesn't be equal to the source enumerator");
        });
        test("A shuffeled empty enumerator should still be an empty enumerator.", () => {
            assert.deepEqual(new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).shuffle().toArray(), [], "A shuffeled empty enumerator should still be an empty enumerator.");
        });
    });
    suite("single", () => {
        test("Should return the expected single result.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "OTTIK").single();
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Should return the expected single result.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).single(CUST => CUST.CustomerID == "OTTIK");
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list with more than one element.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, [1, 2, 1, 2]).single();
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list with more than one element.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for an empty list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).single();
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty list.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more than on match with the predicate.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, [1, 2, 1, 2]).single(item => item == 2);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more than on match with the predicate.");
        });
        test("The call should fail with a \"TS.InvalidOperationException\" for a list which has no match with the predicate.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, [1, 2, 3, 4]).single(item => item == 5);
            }, TS_1.TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a list which has no match with the predicate.");
        });
    });
    suite("singleOrDefault", () => {
        test("Should return the expected single result.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "OTTIK").singleOrDefault(DATA.DATA.Customer);
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Should return the expected single result.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).singleOrDefault(DATA.DATA.Customer, CUST => CUST.CustomerID == "OTTIK");
            assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");
        });
        test("Should return the object created with the default constructor.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "NO_CUSTOMER").singleOrDefault(DATA.DATA.Customer);
            assert.deepEqual(result, new DATA.DATA.Customer(), "Should return the object created with the default constructor.");
        });
        test("Should return the object which was defined as default object.", () => {
            let defaultObj = new DATA.DATA.Customer("Mainstreet 1", "Central City", "2 Bit 2 Fail", "We call you", "", "International", "FOO", "", "555-55-555", "12345", "");
            let result = new TS_1.TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "NO_CUSTOMER").singleOrDefault(defaultObj);
            assert.deepEqual(result, defaultObj, "Should return the object which was defined as default object.");
        });
        test("Should return the object created with the default constructor.", () => {
            let result = new TS_1.TS.Collections.List(false, custEnum).singleOrDefault(DATA.DATA.Customer, CUST => CUST.CustomerID == "NO_CUSTOMER");
            assert.deepEqual(result, new DATA.DATA.Customer(), "Should return the object created with the default constructor.");
        });
        test("Should return the object which was defined as default object.", () => {
            let defaultObj = new DATA.DATA.Customer("Mainstreet 1", "Central City", "2 Bit 2 Fail", "We call you", "", "International", "FOO", "", "555-55-555", "12345", "");
            let result = new TS_1.TS.Collections.List(false, custEnum).singleOrDefault(defaultObj, CUST => CUST.CustomerID == "NO_CUSTOMER");
            assert.deepEqual(result, defaultObj, "Should return the object which was defined as default object.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue'.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).singleOrDefault(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue'.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue'.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).singleOrDefault(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue'.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more thatn one element.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, [1, 2, 1, 2]).singleOrDefault(1);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more thatn one element.");
        });
        test("The call should fail with a \"TS.Linq.MoreThanOneElementException\" for a 'predicate' which selects more than one element from the list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, [1, 2, 1, 2]).singleOrDefault(1, item => item == 2);
            }, TS_1.TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for a 'predicate' which selects more than one element from the list.");
        });
    });
    suite("skip", () => {
        let numList;
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skip(3).count(), 7, "Should returns the expected number of elements.");
        });
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skip(12).count(), 0, "Should returns the expected number of elements.");
        });
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skip(0).count(), 10, "Should returns the expected number of elements.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.", () => {
            assert.throws(() => {
                numList.skip(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.", () => {
            assert.throws(() => {
                numList.skip(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.", () => {
            assert.throws(() => {
                numList.skip(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.");
        });
    });
    suite("skipWhile", () => {
        let numList;
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skipWhile(item => item <= 3).count(), 7, "Should returns the expected number of elements.");
        });
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skipWhile(item => item <= 12).count(), 0, "Should returns the expected number of elements.");
        });
        test("Should returns the expected number of elements.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.skipWhile(item => item < -1).count(), 10, "Should returns the expected number of elements.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.", () => {
            assert.throws(() => {
                numList.skipWhile(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.", () => {
            assert.throws(() => {
                numList.skipWhile(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.");
        });
    });
    suite("sum", () => {
        let numList;
        test("Should return the expected value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.sum(), 55, "Should return the expected value.");
        });
        test("The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).sum();
            }, TS_1.TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty list.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a none numeric list.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, ["a", "b", "c"]).sum();
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a none numeric list.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for list which contains null values.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(true, [1, 2, null, 3, null, 4]).sum();
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for list which contains null values.");
        });
        test("The call should fail with a \"TS.OverflowException\" for list which contains values which add up to an invalid value.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(true, [Number.MAX_SAFE_INTEGER, Number.MAX_VALUE / 2, Number.MAX_VALUE]).sum();
            }, TS_1.TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for list which contains values which add up to an invalid value.");
        });
    });
    suite("take", () => {
        let numList;
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.take(5).count(), 5, "Should return the expected number of elements value.");
        });
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.take(0).count(), 0, "Should return the expected number of elements value.");
        });
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.take(12).count(), 10, "Should return the expected number of elements value.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' values.", () => {
            assert.throws(() => {
                numList.take(-12).count();
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' values.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a null 'count' values.", () => {
            assert.throws(() => {
                numList.take(null).count();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'count' values.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an undefined 'count' values.", () => {
            assert.throws(() => {
                numList.take(undefined).count();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'count' values.");
        });
    });
    suite("takeWhile", () => {
        let numList;
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.takeWhile(item => item < 6).count(), 5, "Should return the expected number of elements value.");
        });
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.takeWhile(item => item > 100).count(), 0, "Should return the expected number of elements value.");
        });
        test("Should return the expected number of elements value.", () => {
            numList = new TS_1.TS.Collections.List(false, numEnum);
            assert.equal(numList.takeWhile(item => item < 100).count(), 10, "Should return the expected number of elements value.");
        });
        test("Should only take until the first mismatch.", () => {
            numList = new TS_1.TS.Collections.List(false, [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]);
            assert.deepEqual(numList.takeWhile(item => item < 5).toArray(), [1, 2, 3, 4], "Should only take until the first mismatch.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a null 'predicate' values.", () => {
            assert.throws(() => {
                numList.takeWhile(null).count();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'predicate' values.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an undefined 'predicate' values.", () => {
            assert.throws(() => {
                numList.takeWhile(undefined).count();
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'predicate' values.");
        });
    });
    suite("toArray", () => {
        let numArr;
        test("Should return a result array which matches with the source enumeration.", () => {
            numArr = new TS_1.TS.Collections.List(false, numEnum).toArray();
            assert.equal(numArr.length, numEnum.count(), "Should return a result array which matches with the source enumeration.");
        });
        test("Should return an empty array for an empty list.", () => {
            assert.equal(new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).toArray().length, 0, "Should return an empty array for an empty list.");
        });
    });
    suite("union", () => {
        test("Should return the expected result when called on numbers array without equality comparer.", () => {
            let resultNumArr = new TS_1.TS.Collections.List(false, [5, 3, 9, 7, 5, 9, 3, 7]).union([8, 3, 6, 4, 4, 9, 1, 0]).toArray();
            assert.deepEqual(resultNumArr, [5, 3, 9, 7, 8, 6, 4, 1, 0], "Should return the expected result when called on numbers array without equality comparer.");
        });
        test("Should return all elements of both test arrays when called without an equality comparer.", () => {
            let resultCarArr1 = new TS_1.TS.Collections.List(false, carEnum).union(createCarsUnionTestArray()).toArray();
            assert.equal(resultCarArr1.length, 10, "Should return all elements of both test arrays when called without an equality comparer.");
        });
        test("Should return only those elements of both test arrays which are uniqe when called with an equality comparer.", () => {
            let resultCarArr2 = new TS_1.TS.Collections.List(false, carEnum).union(createCarsUnionTestArray(), (first, second) => first.name == second.name).toArray();
            assert.equal(resultCarArr2.length, 8, "Should return only those elements of both test arrays which are uniqe when called with an equality comparer.");
        });
        test("Should return an empty enumerator when calle with empty enumerators.", () => {
            let emptyList = new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).union(TS_1.TS.Linq.Enumerator.Empty).toList();
            assert.equal(emptyList.count(), 0, "Should return an empty enumerator when calle with empty enumerators.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).union(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, TS_1.TS.Linq.Enumerator.Empty).union(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
        });
    });
    suite("where", () => {
        test("Should return the expected number of elements for the given query.", () => {
            let result = new TS_1.TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Bob");
            assert.equal(result.count(), 1, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            let result = new TS_1.TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Michael");
            assert.equal(result.count(), 5, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            let result = new TS_1.TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Edward");
            assert.equal(result.count(), 3, "Should return the expected number of elements for the given query.");
        });
        test("Should return the expected number of elements for the given query.", () => {
            let result = new TS_1.TS.Collections.List(false, persEnum).where(pers => pers.FirstName != "");
            assert.equal(result.count(), 400, "Should return the expected number of elements for the given query.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, persEnum).where(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.", () => {
            assert.throws(() => {
                new TS_1.TS.Collections.List(false, persEnum).where(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
        });
    });
    suite("zip", () => {
        test("Should return a none empty enumeration.", () => {
            let resultList = numEnum.zip(custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; }).toList();
            assert.notEqual(resultList, null, "Should return a none empty enumeration.");
        });
        test("Should returns as much elements as the shorter of both enumerations has.", () => {
            let resultList = numEnum.zip(custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; }).toList();
            assert.equal(resultList.count(), numEnum.count(), "Should returns as much elements as the shorter of both enumerations has.");
        });
        test("Should return an enumeration which contains elements of the expected type.", () => {
            let resultList = numEnum.zip(custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; }).toList();
            let resultElement = resultList.first();
            assert.ok((resultElement.number != undefined) && (resultElement.custID != undefined) && (resultElement.custFax != undefined), "Should return an enumeration which contains elements of the expected type.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.", () => {
            assert.throws(() => {
                numEnum.zip(null, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.", () => {
            assert.throws(() => {
                numEnum.zip(custEnum, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.", () => {
            assert.throws(() => {
                numEnum.zip(undefined, (num, cust) => { return {}; });
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.", () => {
            assert.throws(() => {
                numEnum.zip(custEnum, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.");
        });
    });
});

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
suite("TS.Linq.OrderedEnumerator", () => {
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
    suite("constructor", () => {
        let orderedEnumerator;
        let resultArray;
        test("The constructor should return an object when called with proper arguments.", () => {
            orderedEnumerator = new TS_1.TS.Linq.OrderedEnumerator(createSortTestArray(), item => item.color, (first, second) => first.localeCompare(second));
            assert.notEqual(orderedEnumerator, null, "The constructor should return an object when called with proper arguments.");
        });
        test("The returned object should be iterable.", () => {
            orderedEnumerator = new TS_1.TS.Linq.OrderedEnumerator(createSortTestArray(), item => item.color, (first, second) => first.localeCompare(second));
            assert.ok(TS_1.TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
        });
        test("Should hold as much elements as originally used during construction.", () => {
            resultArray = orderedEnumerator.toArray();
            assert.equal(resultArray.length, createSortTestArray().length, "Should hold as much elements as originally used during construction.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'enumerator' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(null, (item) => item, (first, second) => 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'enumerator' argument.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'keySelector' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(TS_1.TS.Linq.Enumerator.Empty, null, (first, second) => 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'keySelector' argument.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'comparer' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(TS_1.TS.Linq.Enumerator.Empty, (item) => item, null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'comparer' argument.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(undefined, (item) => item, (first, second) => 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'enumerator' argument.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'keySelector' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(TS_1.TS.Linq.Enumerator.Empty, undefined, (first, second) => 0);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'keySelector' argument.");
        });
        test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'comparer' argument.", () => {
            assert.throws(() => {
                let obj = new TS_1.TS.Linq.OrderedEnumerator(TS_1.TS.Linq.Enumerator.Empty, (item) => item, undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'comparer' argument.");
        });
    });
    suite("thenBy", () => {
        let orderedEnumerator;
        let resultArray;
        let sortedByColor;
        let sortedByLocation;
        let colorsArray = ["red", "blue", "green"];
        test("The call to 'thenBy' should return an object.", () => {
            orderedEnumerator = new TS_1.TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
            orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
            assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
        });
        test("The returned object should be iterable.", () => {
            orderedEnumerator = new TS_1.TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
            orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
            assert.ok(TS_1.TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
        });
        test("The result array should be sorted by color in the first place.", () => {
            //
            //Check that the items are sorted by color as 
            //expected.
            //
            orderedEnumerator = new TS_1.TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
            orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
            resultArray = orderedEnumerator.toArray();
            sortedByColor = true;
            let lastItem = null;
            for (let item of resultArray) {
                if (lastItem != null) {
                    if (lastItem.color > item.color) {
                        sortedByColor = false;
                        break;
                    } //END if
                } //END if
                lastItem = item;
            } //END for
            assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");
        });
        test("The result array should be sorted by location in the second place.", () => {
            //
            //Check that in each color group the items 
            //are sorted by location as expected.
            //
            orderedEnumerator = new TS_1.TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
            orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
            sortedByLocation = true;
            for (let color of colorsArray) {
                let colorGroupArray = resultArray.filter(Item => Item.color == color);
                let lastItem = null;
                for (let item of colorGroupArray) {
                    if (lastItem != null) {
                        if (lastItem.location > item.location) {
                            sortedByLocation = false;
                            break;
                        } //END if
                    } //END if
                    lastItem = item;
                }
            }
            assert.ok(sortedByLocation, "The result array should be sorted by location in the second place.");
        });
        test("An empty OrderedEnumerator should stay empty even after subsequent sort requests.", () => {
            orderedEnumerator = TS_1.TS.Linq.OrderedEnumerator.Empty.thenBy(Item => Item.location);
            assert.equal(orderedEnumerator.count(), 0, "An empty OrderedEnumerator should stay empty even after subsequent sort requests.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" when called with a null 'keySelector' argument.", () => {
            assert.throws(() => {
                orderedEnumerator.thenBy(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" when called with a null 'keySelector' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  when called with an undefined 'keySelector' argument.", () => {
            assert.throws(() => {
                orderedEnumerator.thenBy(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  when called with an undefined 'keySelector' argument.");
        });
    });
    suite("thenByDescending", () => {
        let orderedEnumerator;
        let resultArray;
        let sortedByColor;
        let sortedByLocation;
        let colorsArray = ["red", "blue", "green"];
        test("The call to 'thenBy' should return an object.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
            orderedEnumerator = TS_1.TS.Linq.Extensions.thenByDescending(orderedEnumerator, Item => Item.location);
            assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
        });
        test("The returned object should be iterable.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
            orderedEnumerator = TS_1.TS.Linq.Extensions.thenByDescending(orderedEnumerator, Item => Item.location);
            assert.ok(TS_1.TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
        });
        test("The result array should be sorted by color in the first place.", () => {
            //
            //Check that the items are sorted by color as 
            //expected.
            //
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
            orderedEnumerator = TS_1.TS.Linq.Extensions.thenByDescending(orderedEnumerator, Item => Item.location);
            sortedByColor = true;
            let lastItem = null;
            for (let item of orderedEnumerator) {
                if (lastItem != null) {
                    if (lastItem.color > item.color) {
                        sortedByColor = false;
                        break;
                    } //END if
                } //END if
                lastItem = item;
            } //END for
            assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");
        });
        test("The result array should be sorted by location descending in the second place.", () => {
            //
            //Check that in each color group the items 
            //are sorted by location as expected.
            //
            orderedEnumerator = TS_1.TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
            orderedEnumerator = TS_1.TS.Linq.Extensions.thenByDescending(orderedEnumerator, Item => Item.location);
            resultArray = TS_1.TS.Linq.Extensions.toArray(orderedEnumerator);
            sortedByLocation = true;
            for (let color of colorsArray) {
                let colorGroupArray = resultArray.filter(Item => Item.color == color);
                let lastItem = null;
                for (let item of colorGroupArray) {
                    if (lastItem != null) {
                        if (lastItem.location < item.location) {
                            sortedByLocation = false;
                            break;
                        } //END if
                    } //END if
                    lastItem = item;
                }
            }
            assert.ok(sortedByLocation, "The result array should be sorted by location descending in the second place.");
        });
        test("Should return an empty enumerator when called with an empty enumerator.", () => {
            orderedEnumerator = TS_1.TS.Linq.Extensions.thenByDescending(TS_1.TS.Linq.OrderedEnumerator.Empty, Item => Item.location);
            assert.equal(TS_1.TS.Linq.Extensions.count(orderedEnumerator), 0, "Should return an empty enumerator when called with an empty enumerator.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.thenByDescending(null, Item => Item.location);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Linq.Extensions.thenByDescending(undefined, Item => Item.location);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
        });
    });
});

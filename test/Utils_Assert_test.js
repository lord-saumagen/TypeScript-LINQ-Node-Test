"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="DATA.ts" />
const assert = require('assert');
const TS_1 = require('../node_modules/typescript-linq/TS');
const DATA_1 = require('./DATA');
suite("TS.Utils.Assert", () => {
    let custEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreateCustomerArray());
    let persEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreatePersonArray());
    let ordEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreateOrdersArray());
    let carEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreateCarsArray());
    let numEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreateNumberArray());
    let strEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.CreateStringArray());
    let lowCharEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.lowerCharArray);
    let UpCharEnum = new TS_1.TS.Linq.Enumerator(DATA_1.DATA.upperCharArray);
    suite("isPlainObject", () => {
        test("Should return true for an empty literal object", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject({}), true, "Should return true for an empty literal object");
        });
        test("Should return true for a new created Object with argument 'null'.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject(new Object(null)), true, "Should return true for a new created Object with argument 'null'.");
        });
        test("Should return true for a plain none empty object.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject({ "one": 1, "two": 2 }), true, "Should return true for a plain none empty object.");
        });
        test("Should return false for a complex object.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject(new DATA_1.DATA.Car("SUBURA", 200, false, 2020, 50000)), false, "Should return false for a complex object.");
        });
        test("Should return false when called with an array argument.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject([1, 2, 3]), false, "Should return false when called with an array argument.");
        });
        test("Should return false when called with a null argument.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject(null), false, "Should return false when called with a null argument.");
        });
        test("Should return false when called with an undefined argument.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPlainObject(undefined), false, "Should return false when called with an undefined argument.");
        });
    });
    suite("isPlainObject", () => {
        test("Should return true for a boolean value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(true), true, "Should return true for a boolean value.");
        });
        test("Should return true for a null value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(null), true, "Should return true for a null value.");
        });
        test("Should return true for an undefined value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(undefined), true, "Should return true for an undefined value.");
        });
        test("Should return true for an integer number value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(12), true, "Should return true for an integer number value.");
        });
        test("Should return true for a floating point number value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(1.2), true, "Should return true for a floating point number value.");
        });
        test("Should return true for a symbol value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(Symbol()), true, "Should return true for a symbol value.");
        });
        test("Should return false for a boolean object value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(new Boolean(false)), false, "Should return false for a boolean object value.");
        });
        test("Should return false for a number object value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(new Number(12)), false, "Should return false for a number object value.");
        });
        test("Should return false for a string object value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType(new String("two")), false, "Should return false for a string object value.");
        });
        test("Should return false for a literal object value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType({}), false, "Should return false for a literal object value.");
        });
        test("Should return false for an array value.", () => {
            assert.equal(TS_1.TS.Utils.Assert.isPrimitiveType([1, 2, 3]), false, "Should return false for an array value.");
        });
    });
});

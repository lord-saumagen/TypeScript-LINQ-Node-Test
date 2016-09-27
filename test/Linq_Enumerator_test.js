"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
const assert = require('assert');
const TS_1 = require('../node_modules/typescript-linq/TS');
suite("TS.Linq.Enumerator", () => {
    suite("constructor", () => {
        let enumeratorObj;
        let faileGenerator;
        let passGenerator = function* () {
            yield Math.floor(Math.random() * 100).toString();
        };
        test("The constructor should return an object when called with a valid 'generator' argument. The returned object should be iterable.", () => {
            enumeratorObj = new TS_1.TS.Linq.Enumerator(passGenerator);
            assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'generator' argument.");
            assert.ok(TS_1.TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");
        });
        test("The constructor should return an object when called with a valid 'source' argument. The returned object should be iterable.", () => {
            enumeratorObj = new TS_1.TS.Linq.Enumerator(["1", "2"]);
            assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'source' argument.");
            assert.ok(TS_1.TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");
        });
        test("The constructor should return an object when called with a valid 'source' and 'selector' argument. The returned object should be iterable.", () => {
            enumeratorObj = new TS_1.TS.Linq.Enumerator(["1", "2"], item => true);
            assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'source' and 'selector' argument.");
            assert.ok(TS_1.TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");
        });
    });
});

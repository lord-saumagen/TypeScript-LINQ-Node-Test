"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
const assert = require('assert');
const TS_1 = require('../node_modules/typescript-linq/TS');
const DATA = require('./DATA');
suite("TS.Utils", () => {
    class TestConstructorCallClass {
        constructor(ID = "1") {
            TS_1.TS.Utils.checkConstructorCall(this, TestConstructorCallClass);
            this._ID = ID;
        }
    }
    let result;
    let sourceString = "abcabcdabcdeabcdefabcdefgabcdefgh";
    let searchString = "abc";
    suite("allIndexOf", () => {
        test("Should return the expected array of indexes.", () => {
            let expectedResult = [0, 3, 7, 12, 18, 25];
            result = TS_1.TS.Utils.allIndexOf(sourceString, searchString);
            assert.deepEqual(result, expectedResult, "Should return the expected array of indexes.");
        });
        test("Should return an empty result array for a search string which has no match.", () => {
            result = TS_1.TS.Utils.allIndexOf(searchString, "xyz");
            assert.ok(result.length == 0, "Should return an empty result array for a search string which has no match.");
        });
        test("Should return an empty result array for a call with an null source string.", () => {
            result = TS_1.TS.Utils.allIndexOf(null, searchString);
            assert.ok(result.length == 0, "Should return an empty result array for a call with an null source string.");
        });
        test("Should return an empty result array for a call with an undefined source string.", () => {
            result = TS_1.TS.Utils.allIndexOf(undefined, searchString);
            assert.ok(result.length == 0, "Should return an empty result array for a call with an undefined source string.");
        });
        test("Should return an empty result array for a call with a null search string.", () => {
            result = TS_1.TS.Utils.allIndexOf(sourceString, null);
            assert.ok(result.length == 0, "Should return an empty result array for a call with a null search string.");
        });
        test("Should return an empty result array for a call with an undefined search string.", () => {
            result = TS_1.TS.Utils.allIndexOf(sourceString, undefined);
            assert.ok(result.length == 0, "Should return an empty result array for a call with an undefined search string.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(undefined); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(null); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(""); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a whitespace parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray("  \r\n"); }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a whitespace parameter value.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter which is not a valid bit string.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray("test"); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter which is not a valid bit string.");
        });
    });
    suite("bitStringToByteArray", () => {
        let testVectors;
        let index;
        let resultArray;
        testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];
        for (index = 0; index < testVectors.length; index++) {
            let innerIndex;
            let testString;
            let testArray;
            testString = "";
            testArray = new Array();
            for (innerIndex = 0; innerIndex <= index; innerIndex++) {
                testString += testVectors[innerIndex].str;
                testArray.push(testVectors[innerIndex].val);
            } //END for
            test("The result array should match with the test values.", () => {
                resultArray = TS_1.TS.Utils.bitStringToByteArray(testString);
                assert.deepEqual(resultArray, testArray, "The result array should match with the test values.");
            });
        } //END for
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(undefined); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(null); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray(""); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a whitespace parameter value.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray("  \r\n"); }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a whitespace parameter value.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter which is not a valid bit string.", () => {
            assert.throws(() => { TS_1.TS.Utils.bitStringToByteArray("test"); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter which is not a valid bit string.");
        });
    });
    suite("byteArrayToBitString", () => {
        let testVectors;
        let index;
        let byteArray;
        let controlStr;
        testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];
        byteArray = new Array();
        controlStr = "";
        for (index = 0; index < testVectors.length; index++) {
            byteArray.push(testVectors[index].val);
            controlStr += testVectors[index].str;
        }
        test("The result string should match with the control string.", () => {
            let resultStr = TS_1.TS.Utils.byteArrayToBitString(byteArray);
            assert.deepEqual(resultStr, controlStr, "The result string should match with the control string.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.", () => {
            assert.throws(() => { TS_1.TS.Utils.byteArrayToBitString([0, 1, null, 3]); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty byteArray argument value.", () => {
            assert.throws(() => { TS_1.TS.Utils.byteArrayToBitString([]); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null byteArray argument value.", () => {
            assert.throws(() => { TS_1.TS.Utils.byteArrayToBitString([]); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined byteArray argument value.", () => {
            assert.throws(() => { TS_1.TS.Utils.byteArrayToBitString(undefined); }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined byteArray argument value.");
        });
    });
    suite("byteArrayToUInt", () => {
        let byteArray = [0X49, 0X96, 0X02, 0XD2];
        let controlResult = 1234567890;
        test("Should return the expected integer result.", () => {
            let result = TS_1.TS.Utils.byteArrayToUInt(byteArray);
            assert.equal(result, controlResult, "Should return the expected integer result.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteArrayToBitString([0, 1, null, 3]);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for an byteArray argument value which exceedes the range of alloewd values.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteArrayToUInt([0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF]);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an byteArray argument value which exceedes the range of alloewd values.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty byteArray argument value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteArrayToUInt([]);
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null byteArray argument value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteArrayToBitString(null);
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null byteArray argument value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined byteArray argument value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteArrayToBitString(undefined);
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an undefined byteArray argument value.");
        });
    });
    suite("byteToBitString", () => {
        let testVectors;
        let resultString;
        let index;
        testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];
        test("The result string should match with the test string.", () => {
            for (index = 0; index < testVectors.length; index++) {
                resultString = TS_1.TS.Utils.byteToBitString(testVectors[index].val);
                assert.equal(resultString, testVectors[index].str, "The result string should match with the test string.");
            } //END for
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'value' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteToBitString(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'value' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'value' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteToBitString(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'value' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a negative integer 'value' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteToBitString(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a negative integer 'value' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an integer which is out of byte range 'value' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteToBitString(256);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an integer which is out of byte range 'value' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an floating point 'value' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.byteToBitString(2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an floating point 'value' argument.");
        });
    });
    suite("checkArrayLikeParameter", () => {
        test("Should pass with a string as parameter.", () => {
            TS_1.TS.Utils.checkArrayLikeParameter("string", "ABCdefGHIjkl", "checkArrayLikeParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a number 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayLikeParameter("number", 5.4, "checkArrayLikeParameter"); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a number 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayLikeParameter("null", null, "checkArrayLikeParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayLikeParameter("undefined", undefined, "checkArrayLikeParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");
        });
    });
    suite("checkArrayParameter", () => {
        test("Should pass with an array as parameter.", () => {
            TS_1.TS.Utils.checkArrayParameter("array", [1, 2], "checkArrayParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayParameter("object", {}, "checkArrayParameter"); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayParameter("object", null, "checkArrayParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkArrayParameter("object", undefined, "checkArrayParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.");
        });
    });
    suite("checkBitStringParameter", () => {
        test("Should pass with a valid bit string as parameter.", () => {
            TS_1.TS.Utils.checkBitStringParameter("bitString", "10010111010", "checkBitStringParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an invalid bit string 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkBitStringParameter("invalidBitString", "10010 11010", "checkBitStringParameter"); }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid bit string 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  whitespace string 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkBitStringParameter("whitespace", " ", "checkBitStringParameter"); }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  whitespace string 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for an empty string 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkBitStringParameter("empty", "", "checkBitStringParameter"); }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for an empty string 'parameter' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a null 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkBitStringParameter("null", null, "checkBitStringParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'parameter' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an undefined 'parameter' argument.", () => {
            assert.throws(() => { TS_1.TS.Utils.checkBitStringParameter("undefined", undefined, "checkBitStringParameter"); }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'parameter' argument.");
        });
    });
    suite("checkBooleanParameter", () => {
        test("Should pass for a parameter value which is the boolean true.", () => {
            TS_1.TS.Utils.checkBooleanParameter("true", true, "checkBooleanParameter");
        });
        test("Should pass for a parameter value which is the boolean false.", () => {
            TS_1.TS.Utils.checkBooleanParameter("false", false, "checkBooleanParameter");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkBooleanParameter("null", null, "checkBooleanParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkBooleanParameter("undefined", undefined, "checkBooleanParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkBooleanParameter("object", {}, "checkBooleanParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a string 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkBooleanParameter("string", "", "checkBooleanParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a string 'parameter' argument.");
        });
    });
    suite("checkConstructorCall", () => {
        let constructResult;
        test("Should pass for a valid constructor call with the new operator.", () => {
            constructResult = new TestConstructorCallClass();
        });
    });
    suite("checkConstructorParameter", () => {
        let testFunc;
        let testFactoryFunc;
        test("Should pass without an exception for a parameter value which is a constructor function.", () => {
            TS_1.TS.Utils.checkConstructorParameter("constructor", TestConstructorCallClass, "checkConstructorParameter");
        });
        testFunc = function (first, second) {
            return first + second;
        };
        testFactoryFunc = function () {
            return new TestConstructorCallClass();
        };
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't meant to be a constructor function.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("object", testFunc, "checkConstructorParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't meant to be a constructor function.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a factory function instead of a constructor function.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("object", testFactoryFunc, "checkConstructorParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a factory function instead of a constructor function.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a object.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("object", {}, "checkConstructorParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a object.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("string", "", "checkConstructorParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("null", null, "checkConstructorParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkConstructorParameter("undefined", undefined, "checkConstructorParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkFunctionParameter", () => {
        test("Should pass without an exception for a parameter value which is a function.", () => {
            TS_1.TS.Utils.checkFunctionParameter("func", () => { }, "checkFunctionParameter");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("null", null, "checkFunctionParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("undefined", undefined, "checkFunctionParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkIntNumberParameter", () => {
        test("Should pass for a parameter value which is a postitive integer number.", () => {
            TS_1.TS.Utils.checkIntNumberParameter("one", 1, "checkIntegerNumberParameter");
        });
        test("Should pass for a parameter value which is a negative integer number.", () => {
            TS_1.TS.Utils.checkIntNumberParameter("minusOne", -1, "checkIntegerNumberParameter");
        });
        test("Should pass for a parameter value which is a number with the value '0'.", () => {
            TS_1.TS.Utils.checkIntNumberParameter("zero", 0, "checkIntegerNumberParameter");
        });
        test("Should pass for a parameter value which is Number.MAX_SAFE_INTEGER.", () => {
            TS_1.TS.Utils.checkIntNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkIntegerNumberParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.MAX_VALUE number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("MAX_VALUE", Number.MAX_VALUE, "checkIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.MAX_VALUE number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.POSITIVE_INFINITY number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.POSITIVE_INFINITY number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.NEGATIVE_INFINITY number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("NEGATIVE_INFINITY", Number.NEGATIVE_INFINITY, "checkIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.NEGATIVE_INFINITY number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("zeroPointFive", 0.5, "checkIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.NaN", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("NaN", Number.NaN, "checkIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.NaN");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("null", null, "checkIntegerNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIntNumberParameter("undefined", undefined, "checkIntegerNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkInstanceOf", () => {
        let testObj0;
        let testLiteralObj;
        testLiteralObj =
            {
                Address: "Main Street 20",
                City: "Vienna",
                CompanyName: "Making Money",
                ContactName: "Call me",
                ContactTitle: "",
                Country: "Austria",
                CustomerID: "42",
                Fax: "1234",
                Phone: "555-555",
                PostalCode: "12345",
                Region: "NW"
            };
        test("Should pass for a parameter value wich is an instance of the specified type.", () => {
            testObj0 = new DATA.DATA.Customer("Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
            TS_1.TS.Utils.checkInstanceOf("testObj0", testObj0, DATA.DATA.Customer, "checkInstanceOf");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a literal boject.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkInstanceOf("testLiteralObj", testLiteralObj, DATA.DATA.Customer, "checkInstanceOf");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a literal boject.");
        });
        test("The call should fail with a \"TS.InvalidInvocationException\" for a type parameter value which is a literal boject.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkInstanceOf("testObj0", testObj0, testLiteralObj, "checkInstanceOf");
            }, TS_1.TS.InvalidInvocationException, "The call should fail with a \"TS.InvalidInvocationException\" for a type parameter value which is a literal boject.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkInstanceOf("null", null, DATA.DATA.Customer, "checkInstanceOf");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkInstanceOf("undefined", undefined, DATA.DATA.Customer, "checkInstanceOf");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("checkIterableParameter", () => {
        test("Should pass for a parameter value which is an array.", () => {
            TS_1.TS.Utils.checkIterableParameter("array", [1, 2, 3, 4, 5], "checkIterableParameter");
        });
        test("Should pass for a parameter value which is a string.", () => {
            TS_1.TS.Utils.checkIterableParameter("string", "AbCdEf", "checkIterableParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIterableParameter("object", {}, "checkIterableParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIterableParameter("null", null, "checkIterableParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkIterableParameter("undefined", undefined, "checkIterableParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");
        });
    });
    suite("checkKeyByteArray", () => {
        let testArray16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let testArray24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        let testArray32 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
        test("Should pass for a parameter value which is a valid 16 byte array.", () => {
            TS_1.TS.Utils.checkKeyByteArray("testArray16", testArray16, "checkKeyByteArray");
        });
        test("Should pass for a parameter value which is a valid 24 byte array.", () => {
            TS_1.TS.Utils.checkKeyByteArray("testArray24", testArray24, "checkKeyByteArray");
        });
        test("Should pass for a parameter value which is a valid 32 byte array.", () => {
            TS_1.TS.Utils.checkKeyByteArray("testArray32", testArray32, "checkKeyByteArray");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which deceeds the minimum array length.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkKeyByteArray("shortArray", [1, 2, 3], "checkKeyByteArray");
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which deceeds the minimum array length.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which exceeds the maximum array length.", () => {
            assert.throws(() => {
                testArray32.push(33);
                TS_1.TS.Utils.checkKeyByteArray("longArray", testArray32, "checkKeyByteArray");
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which exceeds the maximum array length.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a call with an array which is not a valid unsigned byte array.", () => {
            assert.throws(() => {
                testArray24[15] = null;
                TS_1.TS.Utils.checkKeyByteArray("invallidArray", testArray24, "checkKeyByteArray");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call with an array which is not a valid unsigned byte array.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a null 'parameter' value.", () => {
            assert.throws(() => {
                testArray24[15] = null;
                TS_1.TS.Utils.checkKeyByteArray("longArray", null, "checkKeyByteArray");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a null 'parameter' value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an undefined 'parameter' value.", () => {
            assert.throws(() => {
                testArray24[15] = null;
                TS_1.TS.Utils.checkKeyByteArray("longArray", undefined, "checkKeyByteArray");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an undefined 'parameter' value.");
        });
    });
    suite("checkNotEmptyParameter", () => {
        test("Should pass with a none empty array as argument value.", () => {
            TS_1.TS.Utils.checkNotEmptyParameter("array", [1, 2], "checkNotEmptyParameter");
        });
        test("Should pass with a none empty string argument value.", () => {
            TS_1.TS.Utils.checkNotEmptyParameter("string", "Test", "checkNotEmptyParameter");
        });
        test("Should pass with a number argument value.", () => {
            TS_1.TS.Utils.checkNotEmptyParameter("number", 0, "checkNotEmptyParameter");
        });
        test("Should pass with an object argument value.", () => {
            TS_1.TS.Utils.checkNotEmptyParameter("object", {}, "checkNotEmptyParameter");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty string parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNotEmptyParameter("emptyString", "", "checkNotEmptyParameter");
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty string parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty array parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNotEmptyParameter("emptyArra", [], "checkNotEmptyParameter");
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty array parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNotEmptyParameter("null", null, "checkNotEmptyParameter");
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNotEmptyParameter("undefined", undefined, "checkNotEmptyParameter");
            }, TS_1.TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a undefined parameter value.");
        });
    });
    suite("checkNotUndefinedParameter", () => {
        test("Should pass for a parameter value which is an object.", () => {
            TS_1.TS.Utils.checkNotUndefinedParameter("object", {}, "checkNotUndefinedParameter");
        });
        test("Should pass for a parameter value which is a string.", () => {
            TS_1.TS.Utils.checkNotUndefinedParameter("string", "", "checkNotUndefinedParameter");
        });
        test("Should pass for a parameter value which is null.", () => {
            TS_1.TS.Utils.checkNotUndefinedParameter("null", null, "checkNotUndefinedParameter");
        });
        test("The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNotUndefinedParameter("undefined", undefined, "checkNotUndefinedParameter");
            }, TS_1.TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkNumberParameter", () => {
        test("Should pass for a positive integer parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("intNumber", 10, "checkNumberParameter");
        });
        test("Should pass for a negative parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("intNumber", -10, "checkNumberParameter");
        });
        test("Should pass for a zero parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("zero", 0, "checkNumberParameter");
        });
        test("Should pass for a positive float parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("float", 2.5, "checkNumberParameter");
        });
        test("Should pass for a negative float parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("float", -2.5, "checkNumberParameter");
        });
        test("Should pass for a positive Number.MAX_VALUE parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("float", 314e-2, "checkNumberParameter");
        });
        test("Should pass for a negative Number.MAX_VALUE parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("float", 0.0314E+2, "checkNumberParameter");
        });
        test("Should pass for a negative Number.MIN_SAFE_INTEGER parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("MIN_SAFE_INTEGER", Number.MIN_SAFE_INTEGER, "checkNumberParameter");
        });
        test("Should pass for a negative Number.MAX_SAFE_INTEGER parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkNumberParameter");
        });
        test("Should pass for a negative Number.MIN_VALUE parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("MIN_SAFE_INTEGER", Number.MIN_VALUE, "checkNumberParameter");
        });
        test("Should pass for a negative Number.MAX_VALUE parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("MAX_SAFE_INTEGER", Number.MAX_VALUE, "checkNumberParameter");
        });
        test("Should pass for a negative Number.NEGATIVE_INFINITY parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("NEGATIVE_INFINITY", Number.NEGATIVE_INFINITY, "checkNumberParameter");
        });
        test("Should pass for a negative Number.POSITIVE_INFINITY parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkNumberParameter");
        });
        test("Should pass for a negative number object parameter value.", () => {
            TS_1.TS.Utils.checkNumberParameter("numberObject", new Number(5), "checkNumberParameter");
        });
        test("The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is a string.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNumberParameter("numberString", "5", "checkNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is a string.");
        });
        test("The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is an object.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNumberParameter("object", {}, "checkNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is an object.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parmeter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNumberParameter("null", null, "checkNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parmeter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkNumberParameter("undefined", undefined, "checkNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("checkParameter", () => {
        test("Should pass for a parameter value which is an object.", () => {
            TS_1.TS.Utils.checkParameter("object", {}, "checkParameter");
        });
        test("Should pass for a parameter value which is a string.", () => {
            TS_1.TS.Utils.checkParameter("string", "", "checkParameter");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkParameter("null", null, "checkParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkParameter("undefined", undefined, "checkParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkStringParameter", () => {
        test("Should pass for a parameter value which is a string.", () => {
            TS_1.TS.Utils.checkStringParameter("string", "String", "checkStringParameter");
            assert.ok(true, "Should pass for a parameter value which is a string.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a parameter value which is an empty string.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkStringParameter("emptyString", "", "checkStringParameter");
            }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a parameter value which is an empty string.");
        });
        test("The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  parameter value which is a whitespace string.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkStringParameter("whitespaceString", "     \r\n", "checkStringParameter");
            }, TS_1.TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  parameter value which is a whitespace string.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkStringParameter("null", null, "checkStringParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkStringParameter("undefined", undefined, "checkStringParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkUByteArrayParameter", () => {
        test("Should pass for a parameter value which is a valid uByte array.", () => {
            TS_1.TS.Utils.checkUByteArrayParameter("byteArray", [1, 2, 3, 4, 5], "checkUByteArrayParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("emptyArray", [], "checkUByteArrayParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array with an invalid element.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("invalidArray", [1, 2, null, 4, 5], "checkUByteArrayParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array with an invalid element.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string array.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("stringArray", ["one", "two"], "checkUByteArrayParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string array.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an array.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("noArray", {}, "checkUByteArrayParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an array.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("null", null, "checkUByteArrayParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteArrayParameter("undefined", undefined, "checkUByteArrayParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("checkUByteParameter", () => {
        test("Should pass for a parameter value which is a valid uByte.", () => {
            TS_1.TS.Utils.checkUByteParameter("uByte", 12, "checkUByteParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("string", "0", "checkUByteParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a signed byte.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("negative", -12, "checkUByteParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a signed byte.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which exceeds the byte value range.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("bigNumber", 500, "checkUByteParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which exceeds the byte value range.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a byte value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("floatNumber", 2.5, "checkUByteParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a byte value.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an object.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("NaN", {}, "checkUByteParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an object.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("null", null, "checkUByteParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUByteParameter("undefined", undefined, "checkUByteParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("checkUIntNumberParameter", () => {
        test("Should pass for a parameter value which is a postitive integer number.", () => {
            TS_1.TS.Utils.checkUIntNumberParameter("one", 1, "checkUnsignedIntegerNumberParameter");
        });
        test("Should pass for a parameter value which is MAX_VALUE of number.", () => {
            TS_1.TS.Utils.checkUIntNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkUnsignedIntegerNumberParameter");
        });
        test("Should pass for a parameter value which is a number with the value '0'.", () => {
            TS_1.TS.Utils.checkUIntNumberParameter("zero", 0, "checkUnsignedIntegerNumberParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.MAX_VALUE.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter(".MAX_VALUE", Number.MAX_VALUE, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.MAX_VALUE.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.POSITIVE_INFINITY.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.POSITIVE_INFINITY.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("zeroPointFive", 0.5, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative integer number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("minusOne", -1, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative integer number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is NaN.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("NaN", Number.NaN, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is NaN.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("null", null, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUIntNumberParameter("undefined", undefined, "checkUnsignedIntegerNumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
        });
    });
    suite("checkUInt64NumberParameter", () => {
        test("Should pass for a call with a valid UInt64 number.", () => {
            let uintNumber;
            uintNumber = new TS_1.TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
            TS_1.TS.Utils.checkUInt64NumberParameter("UInt64", uintNumber, "checkUInt64NumberParameter");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is not a UInt64 number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUInt64NumberParameter("UInt64", 0, "checkUInt64NumberParameter");
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is not a UInt64 number.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUInt64NumberParameter("UInt64", null, "checkUInt64NumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.checkUInt64NumberParameter("UInt64", undefined, "checkUInt64NumberParameter");
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("compactArray", () => {
        let testArray;
        let resultArray;
        let lengthBefore;
        testArray = [1, 2, 3, , 5, 6, , 7, 8, , 9, , 11];
        resultArray = TS_1.TS.Utils.compactArray(testArray);
        test("Should return an array which has as much elements as the source array had assigned elements.", () => {
            assert.equal(resultArray.length, 9, "Should return an array which has as much elements as the source array had assigned elements.");
        });
        resultArray[resultArray.length - 1] = undefined;
        lengthBefore = resultArray.length;
        test("Should return an array which has a different lenght.", () => {
            resultArray = TS_1.TS.Utils.compactArray(resultArray);
            assert.notEqual(resultArray.length, lengthBefore, "Should return an array which has a different lenght.");
        });
    });
    suite("createGUID", () => {
        let GUIDArray;
        let index;
        let found;
        GUIDArray = new Array();
        for (index = 0; index < 1000; index++) {
            GUIDArray.push(TS_1.TS.Utils.createGUID());
        } //END for
        found = 0;
        for (index = 0; index < 1000; index++) {
            found += GUIDArray.filter((value) => { return value == GUIDArray[index]; }).length;
        } //END for
        test("All elements in the array should be unique.", () => {
            assert.equal(found, 1000, "All elements in the array should be unique.");
        });
    });
    suite("findAllCurrencies", () => {
        let resultArray;
        let ambiguousSymbols = new Array("¥", "£", "$", "₩", "лв");
        let unambiguousSymbols = new Array("₮", "₪", "Q", "Kč", "¢");
        let ambiguousCurrencyNames = new Array("Dollar", "Pound", "Franc", "Rupee", "Dinar");
        let codes = new Array("AED", "AOA", "BHD", "DJF", "EUR", "MNT");
        test("Should return a single currency for the current symbol search pattern.", () => {
            for (let currency of unambiguousSymbols) {
                resultArray = TS_1.TS.Utils.findAllCurrencies(currency);
                assert.equal(resultArray.length, 1, "Should return a single currency for the current symbol search pattern.");
            }
        });
        test("Should return a single currency for the current code search pattern.", () => {
            for (let currency of codes) {
                resultArray = TS_1.TS.Utils.findAllCurrencies(currency);
                assert.equal(resultArray.length, 1, "Should return a single currency for the current code search pattern.");
            }
        });
        test("Should return a multiple currency elements for the current code search pattern.", () => {
            for (let currency of ambiguousSymbols) {
                resultArray = TS_1.TS.Utils.findAllCurrencies(currency);
                assert.ok(resultArray.length > 1, "Should return a multiple currency elements for the current code search pattern.");
            }
        });
        test("Should return a multiple currency elements for the current code search pattern.", () => {
            for (let currency of ambiguousCurrencyNames) {
                resultArray = TS_1.TS.Utils.findAllCurrencies(currency);
                assert.ok(resultArray.length > 1, "Should return a multiple currency elements for the current code search pattern.");
            }
        });
        test("Should return an empty result array for the current code search pattern.", () => {
            for (let currency of ["NOP", "abcdefg", "QWERTY", "%", "§", "--__--"]) {
                resultArray = TS_1.TS.Utils.findAllCurrencies(currency);
                assert.ok(resultArray.length == 0, "Should return an empty result array for the current code search pattern.");
            }
        });
    });
    suite("findSingleCurrency", () => {
        let result;
        let ambiguousSymbols = new Array("¥", "£", "$", "₩", "лв");
        let unambiguousSymbols = new Array("₮", "₪", "Q", "Kč", "¢");
        let codes = new Array("AED", "AOA", "BHD", "DJF", "EUR", "MNT");
        test("Should return a single currency for the current symbol search pattern.", () => {
            for (let currency of unambiguousSymbols) {
                result = TS_1.TS.Utils.findSingleCurrency(currency);
                assert.notEqual(result, null, "Should return a single currency for the current symbol search pattern.");
            }
        });
        test("Should return a single currency for the current code search pattern.", () => {
            for (let currency of codes) {
                result = TS_1.TS.Utils.findSingleCurrency(currency);
                assert.notEqual(result, null, "Should return a single currency for the current code search pattern.");
            }
        });
        test("The call should fail with a \"TS.AmbiguousResultException\" for an ambiguous 'currency' argument.", () => {
            for (let currency of ambiguousSymbols) {
                assert.throws(() => {
                    result = TS_1.TS.Utils.findSingleCurrency(currency);
                }, TS_1.TS.AmbiguousResultException, "The call should fail with a \"TS.AmbiguousResultException\" for an ambiguous 'currency' argument.");
            }
        });
    });
    suite("nextIndexOfReverse", () => {
        let result;
        let sourceString = "abcabcdabcdeabcdefabcdefgabcdefgh";
        let searchString = "abc";
        test("Should return the expected position as search result.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, searchString, 33);
            assert.ok(result == 25, "Should return the expected position as search result.");
        });
        test("Should return the expected position as search result.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, searchString, 24);
            assert.ok(result == 18, "Should return the expected position as search result.");
        });
        test("Should return the expected position as search result.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, searchString, 17);
            assert.ok(result == 12, "Should return the expected position as search result.");
        });
        test("Should return the expected position as search result.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, searchString, 11);
            assert.ok(result == 7, "Should return the expected position as search result.");
        });
        test("Should return -1 for a call with a null source string.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(null, searchString, 1);
            assert.ok(result == -1, "Should return -1 for a call with a null source string.");
        });
        test("Should return -1 for a call with an undefined source string.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(undefined, searchString, 1);
            assert.ok(result == -1, "Should return -1 for a call with an undefined source string.");
        });
        test("Should return -1 for a call with an negative start index.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, searchString, -1);
            assert.ok(result == -1, "Should return -1 for a call with an negative start index.");
        });
        test("Should return -1 for a call with a null search string.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, null, 1);
            assert.ok(result == -1, "Should return -1 for a call with a null search string.");
        });
        test("Should return -1 for a call with an undefined search string.", () => {
            result = TS_1.TS.Utils.nextIndexOfReverse(sourceString, undefined, 1);
            assert.ok(result == -1, "Should return -1 for a call with an undefined search string.");
        });
    });
    suite("normalizePath", () => {
        let testPath;
        let resultPath;
        let controlPath;
        testPath = "C:\\\\Windows\\Programs\\.\\Test Programs\\Data\\..\\Search\\No more\\.\\Result\\..\\to Show";
        controlPath = "C:/Windows/Programs/Test Programs/Search/No more/to Show";
        resultPath = TS_1.TS.Utils.normalizePath(testPath);
        test("Should return a path with no more backslashes.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.equal(resultPath.indexOf("\\"), -1, "Should return a path with no more backslashes.");
        });
        test("Should return a path with no more double slashes.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.equal(resultPath.indexOf("//"), -1, "Should return a path with no more double slashes.");
        });
        test("Should return a path with no more '/./'.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.equal(resultPath.indexOf("/./"), -1, "Should return a path with no more '/./'.");
        });
        test("Should return a path with no more '/../'.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.equal(resultPath.indexOf("/../"), -1, "Should return a path with no more '/../'.");
        });
        test("Should return a path with no trailing slash.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.ok(!resultPath.endsWith("/"), "Should return a path with no trailing slash.");
        });
        test("Should return a path which matches with the control path.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(testPath);
            assert.deepEqual(resultPath, controlPath, "Should return a path which matches with the control path.");
        });
        test("An 'up navigation' following a drive letter should be ignored.", () => {
            assert.deepEqual(TS_1.TS.Utils.normalizePath("A:\\\\..\\Dir1\\Dir2"), "A:/Dir1/Dir2", "An 'up navigation' following a drive letter should be ignored.");
        });
        test("An 'up navigation' following the root should be ignored.", () => {
            assert.deepEqual(TS_1.TS.Utils.normalizePath("/../Dir1/Dir2"), "/Dir1/Dir2", "An 'up navigation' following the root should be ignored.");
        });
        test("Should return an empty path when called with a null value.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(null);
            assert.equal(resultPath.length, 0, "Should return an empty path when called with a null value.");
        });
        test("Should return an empty path when called with an undefined value.", () => {
            resultPath = TS_1.TS.Utils.normalizePath(undefined);
            assert.equal(resultPath.length, 0, "Should return an empty path when called with an undefined value.");
        });
    });
    suite("padLeft", () => {
        let sourceString;
        let destinyString;
        sourceString = "OneTwo";
        test("Should return a string with the expected length", () => {
            destinyString = TS_1.TS.Utils.padLeft(sourceString, "12", 40);
            assert.equal(destinyString.length, 40, "Should return a string with the expected length");
        });
        test("Should return a copy of the source string if argument fillChar is invalid.", () => {
            destinyString = TS_1.TS.Utils.padLeft(sourceString, null, 40);
            assert.equal(destinyString, sourceString, "Should return a copy of the source string if argument fillChar is invalid.");
        });
        test("Should return a copy of the source string if argument length is invalid.", () => {
            destinyString = TS_1.TS.Utils.padLeft(sourceString, "&", -10);
            assert.equal(destinyString, sourceString, "Should return a copy of the source string if argument length is invalid.");
        });
        test("Should return a string consisting only of concatenated fillChar values if calle with a null value for the source parameter.", () => {
            destinyString = TS_1.TS.Utils.padLeft(null, "12345", 10);
            assert.equal(destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with a null value for the source parameter.");
        });
        test("Should return a string consisting only of concatenated fillChar values if calle with an undefined value for the source parameter.", () => {
            destinyString = TS_1.TS.Utils.padLeft(undefined, "12345", 10);
            assert.equal(destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with an undefined value for the source parameter.");
        });
    });
    suite("removeUTF8BOM", () => {
        test("Should returns a string without the UTF-8 BOM.", () => {
            let testString = "ï»¿ Here is normal text";
            assert.equal(TS_1.TS.Utils.removeUTF8BOM(testString), " Here is normal text", "Should returns a string without the UTF-8 BOM.");
        });
    });
    suite("UByteToHexString", () => {
        let testVectors;
        let index;
        testVectors = [{ str: "aa", val: 170 }, { str: "0f", val: 15 }, { str: "55", val: 85 }, { str: "00", val: 0 }, { str: "01", val: 1 }];
        test("Should return the expected hex string.", () => {
            for (index = 0; index < testVectors.length; index++) {
                assert.equal(TS_1.TS.Utils.UByteToHexString(testVectors[index].val), testVectors[index].str, "Should return the expected hex string.");
            }
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't an integer number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't an integer number.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value outside the byte number range.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(300);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value outside the byte number range.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");
        });
    });
    suite("UInt32To4ByteArray", () => {
        let testVectors;
        let index;
        testVectors = [{ ByteArray: [0, 0, 0, 1], val: 1 }, { ByteArray: [0, 0, 1, 1], val: 257 }, { ByteArray: [0, 1, 1, 1], val: 65793 }, { ByteArray: [1, 1, 1, 1], val: 16843009 }];
        test("Should resturn the expected byte array.", () => {
            for (index = 0; index < testVectors.length; index++) {
                assert.deepEqual(TS_1.TS.Utils.UInt32To4ByteArray(testVectors[index].val), testVectors[index].ByteArray, "Should resturn the expected byte array.");
            }
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32To4ByteArray(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an integer number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32To4ByteArray(2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an integer number.");
        });
        test("The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value which exceeds the number range of a UInt32.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32To4ByteArray(4294967296);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value which exceeds the number range of a UInt32.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32To4ByteArray(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32To4ByteArray(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
        });
    });
    suite("UInt32ToHexString", () => {
        let testVectors;
        let index;
        testVectors = [{ str: "ffffffff", val: 4294967295 }, { str: "00ffffff", val: 16777215 }, { str: "0000ffff", val: 65535 }, { str: "000000ff", val: 255 }];
        test("Should return the expected hex string.", () => {
            for (index = 0; index < testVectors.length; index++) {
                assert.equal(TS_1.TS.Utils.UInt32ToHexString(testVectors[index].val), testVectors[index].str, "Should return the expected hex string.");
            }
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32ToHexString(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32ToHexString(2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32ToHexString(4294967296);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32ToHexString(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UByteToHexString(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");
        });
    });
    suite("UIntToByteArray", () => {
        let testVectors;
        let index;
        testVectors = [{ ByteArray: [1], val: 1 }, { ByteArray: [1, 1], val: 257 }, { ByteArray: [1, 1, 1], val: 65793 }, { ByteArray: [1, 1, 1, 1], val: 16843009 }, { ByteArray: [1, 1, 1, 1, 1], val: 4311810305 }, { ByteArray: [1, 1, 1, 1, 1, 1], val: 1103823438081 }, { ByteArray: [0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff], val: 9007199254740991 }];
        test("Should resturn the expected byte array.", () => {
            for (index = 0; index < testVectors.length; index++) {
                assert.deepEqual(TS_1.TS.Utils.UIntToByteArray(testVectors[index].val), testVectors[index].ByteArray, "Should resturn the expected byte array.");
            }
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UIntToByteArray(-1);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UIntToByteArray(2.5);
            }, TS_1.TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UInt32ToHexString(4294967296);
            }, TS_1.TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for a null parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UIntToByteArray(null);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for a null parameter value.");
        });
        test("The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.", () => {
            assert.throws(() => {
                TS_1.TS.Utils.UIntToByteArray(undefined);
            }, TS_1.TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");
        });
    });
});

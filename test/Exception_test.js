"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
const assert = require('assert');
const TS_1 = require('../node_modules/typescript-linq/TS');
suite("TS.Exception", () => {
    suite("TS.AmbiguousResultException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.AmbiguousResultException("ArgName", 5, "AmbiguousResult exception message");
            }, (err) => err.type == "TS.AmbiguousResultException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.AmbiguousResultException("ArgName", 5, "AmbiguousResult exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.AmbiguousResultException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentException("ArgName", 5, "Argument exception message");
            }, (err) => err.type == "TS.ArgumentException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentException("ArgName", 5, "Argument exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentNullException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullException("ArgName", "ArgumentNull exception message");
            }, (err) => err.type == "TS.ArgumentNullException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullException("ArgName", "ArgumentNull exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentNullException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentNullOrUndefinedException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullOrUndefinedException("ArgName", "ArgumentNullOrUndefined exception message");
            }, (err) => err.type == "TS.ArgumentNullOrUndefinedException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullOrUndefinedException("ArgName", "ArgumentNullOrUndefined exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentNullOrUndefinedException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentNullUndefOrEmptyException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullUndefOrEmptyException("ArgName", "ArgumentNullUndefOrEmpty exception message");
            }, (err) => err.type == "TS.ArgumentNullUndefOrEmptyException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullUndefOrEmptyException("ArgName", "ArgumentNullUndefOrEmpty exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentNullUndefOrEmptyException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentNullUndefOrWhiteSpaceException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", "ArgumentNullUndefOrWhiteSpace exception message");
            }, (err) => err.type == "TS.ArgumentNullUndefOrWhiteSpaceException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", "ArgumentNullUndefOrWhiteSpace exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentNullUndefOrWhiteSpaceException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentOutOfRangeException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentOutOfRangeException("ArgName", 12, "ArgumentOutOfRange exception message");
            }, (err) => err.type == "TS.ArgumentOutOfRangeException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentOutOfRangeException("ArgName", 12, "ArgumentOutOfRange exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentOutOfRangeException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArgumentUndefinedException constructor", () => {
        var ExceptionMessage = "ArgumentUndefinedException exception message";
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentUndefinedException("ArgName", "ArgumentUndefined exception message");
            }, (err) => err.type == "TS.ArgumentUndefinedException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArgumentUndefinedException("ArgName", "ArgumentUndefined exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArgumentUndefinedException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.ArithmeticException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArithmeticException("Arithmetic exception message");
            }, (err) => err.type == "TS.ArithmeticException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.ArithmeticException("Arithmetic exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.ArithmeticException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.DeprecatedException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DeprecatedException("Deprecated exception message");
            }, (err) => err.type == "TS.DeprecatedException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DeprecatedException("Deprecated exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.DeprecatedException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.DirectoryNotFoundException constructor", () => {
        var ExceptionMessage = "DirectoryNotFound exception message";
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DirectoryNotFoundException("Dir", "C:/", "DirectoryNotFound exception message");
            }, (err) => err.type == "TS.DirectoryNotFoundException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DirectoryNotFoundException("Dir", "C:/", "DirectoryNotFound exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.DirectoryNotFoundException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.DividedByZeroException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DividedByZeroException("Divide by zero exception message");
            }, (err) => err.type == "TS.DividedByZeroException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.DividedByZeroException("Divide by zero exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.DividedByZeroException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.Exception constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.Exception("Exception message");
            }, (err) => err.type == "TS.Exception", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.Exception("Exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.Exception" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.IndexOutOfRangeException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(() => {
                throw new TS_1.TS.IndexOutOfRangeException("IndexOutOfRange exception message");
            }, (err) => err.type == "TS.IndexOutOfRangeException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(() => {
                throw new TS_1.TS.IndexOutOfRangeException("IndexOutOfRange exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.IndexOutOfRangeException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.InvalidCastException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidCastException("InvalidCast exception message");
            }, (err) => err.type == "TS.InvalidCastException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidCastException("InvalidCast exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.InvalidCastException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.InvalidFormatException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidFormatException("ArgName", "NOP", "Invalid format exception message");
            }, (err) => err.type == "TS.InvalidFormatException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidFormatException("ArgName", "NOP", "Invalid format exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.InvalidFormatException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.InvalidInvocationException constructor", () => {
        var ExceptionMessage = "InvalidInvocation exception message";
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidInvocationException("InvalidInvocation exception message");
            }, (err) => err.type == "TS.InvalidInvocationException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidInvocationException("InvalidInvocation exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.InvalidInvocationException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.InvalidOperationException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidOperationException("Invalid operation exception message");
            }, (err) => err.type == "TS.InvalidOperationException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidOperationException("Invalid operation exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.InvalidOperationException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.InvalidTypeException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidTypeException("ArgName", "NOP", "Invalid type exception message");
            }, (err) => err.type == "TS.InvalidTypeException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.InvalidTypeException("ArgName", "NOP", "Invalid type exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.InvalidTypeException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.NotFiniteNumberException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.NotFiniteNumberException("Not finite number exception message");
            }, (err) => err.type == "TS.NotFiniteNumberException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.NotFiniteNumberException("Not finite number exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.NotFiniteNumberException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.NotImplementedException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.NotImplementedException("NotImplemented exception message");
            }, (err) => err.type == "TS.NotImplementedException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.NotImplementedException("NotImplemented exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.NotImplementedException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    suite("TS.OverflowException constructor", () => {
        test("Should raise an exception instance that matched with the expected instance.", () => {
            assert.throws(function () {
                throw new TS_1.TS.OverflowException("Overflow exception message");
            }, (err) => err.type == "TS.OverflowException", "Should raise an exception instance that matched with the expected instance.");
        });
        test("Should raise an exception instance of the expected type with an inner exception.", () => {
            assert.throws(function () {
                throw new TS_1.TS.OverflowException("Overflow exception message", getInnerExcepton());
            }, (err) => {
                return err.type == "TS.OverflowException" && err.innerException.message == getInnerExcepton().message;
            }, "Should raise an exception instance of the expected type with an inner exception.");
        });
    });
    /**
    *  @description Creates and returns a new exception of type TS.Exception with the message text: "Inner exception message".
    */
    function getInnerExcepton() {
        return new TS_1.TS.Exception("Inner exception message");
    }
});

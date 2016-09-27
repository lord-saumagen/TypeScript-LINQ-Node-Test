/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
import * as assert from 'assert';
import {TS} from '../node_modules/typescript-linq/TS';


suite("TS.Exception", () => 
{

  suite("TS.AmbiguousResultException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.AmbiguousResultException("ArgName", 5, "AmbiguousResult exception message");
      }, (err: any) => err.type == "TS.AmbiguousResultException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.AmbiguousResultException("ArgName", 5, "AmbiguousResult exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.AmbiguousResultException" && (err as TS.AmbiguousResultException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentException constructor", () =>
  {

    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentException("ArgName", 5, "Argument exception message");
      }, (err: any) => err.type == "TS.ArgumentException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentException("ArgName", 5, "Argument exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentException" && (err as TS.ArgumentException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentNullException constructor", () =>
  {

    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullException("ArgName", "ArgumentNull exception message");
      }, (err: any) => err.type == "TS.ArgumentNullException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullException("ArgName", "ArgumentNull exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentNullException" && (err as TS.ArgumentException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentNullOrUndefinedException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullOrUndefinedException("ArgName", "ArgumentNullOrUndefined exception message");
      }, (err: any) => err.type == "TS.ArgumentNullOrUndefinedException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullOrUndefinedException("ArgName", "ArgumentNullOrUndefined exception message", getInnerExcepton());
      },
        (err: any) =>
        {
          return err.type == "TS.ArgumentNullOrUndefinedException" && (err as TS.ArgumentNullOrUndefinedException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentNullUndefOrEmptyException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function () 
      {
        throw new TS.ArgumentNullUndefOrEmptyException("ArgName", "ArgumentNullUndefOrEmpty exception message");
      }, (err: any) => err.type == "TS.ArgumentNullUndefOrEmptyException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullUndefOrEmptyException("ArgName", "ArgumentNullUndefOrEmpty exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentNullUndefOrEmptyException" && (err as TS.ArgumentNullUndefOrEmptyException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentNullUndefOrWhiteSpaceException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function () 
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", "ArgumentNullUndefOrWhiteSpace exception message");
      }, (err: any) => err.type == "TS.ArgumentNullUndefOrWhiteSpaceException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", "ArgumentNullUndefOrWhiteSpace exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentNullUndefOrWhiteSpaceException" && (err as TS.ArgumentNullUndefOrWhiteSpaceException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArgumentOutOfRangeException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentOutOfRangeException("ArgName", 12, "ArgumentOutOfRange exception message");
      }, (err: any) => err.type == "TS.ArgumentOutOfRangeException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentOutOfRangeException("ArgName", 12, "ArgumentOutOfRange exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentOutOfRangeException" && (err as TS.ArgumentOutOfRangeException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

  });


  suite("TS.ArgumentUndefinedException constructor", () => 
  {
    var ExceptionMessage = "ArgumentUndefinedException exception message";

    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentUndefinedException("ArgName", "ArgumentUndefined exception message");
      }, (err: any) => err.type == "TS.ArgumentUndefinedException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArgumentUndefinedException("ArgName", "ArgumentUndefined exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArgumentUndefinedException" && (err as TS.ArgumentUndefinedException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.ArithmeticException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArithmeticException("Arithmetic exception message");
      }, (err: any) => err.type == "TS.ArithmeticException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.ArithmeticException("Arithmetic exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.ArithmeticException" && (err as TS.ArithmeticException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.DeprecatedException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DeprecatedException("Deprecated exception message");
      }, (err: any) => err.type == "TS.DeprecatedException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DeprecatedException("Deprecated exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.DeprecatedException" && (err as TS.DeprecatedException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.DirectoryNotFoundException constructor", () => 
  {
    var ExceptionMessage = "DirectoryNotFound exception message";

    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DirectoryNotFoundException("Dir", "C:/", "DirectoryNotFound exception message");
      }, (err: any) => err.type == "TS.DirectoryNotFoundException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DirectoryNotFoundException("Dir", "C:/", "DirectoryNotFound exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.DirectoryNotFoundException" && (err as TS.DirectoryNotFoundException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

  });


  suite("TS.DividedByZeroException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DividedByZeroException("Divide by zero exception message");
      }, (err: any) => err.type == "TS.DividedByZeroException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.DividedByZeroException("Divide by zero exception message", getInnerExcepton());
      }, (err: any) =>
        {
        return err.type == "TS.DividedByZeroException" && (err as TS.DividedByZeroException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.Exception constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.Exception("Exception message");
      }, (err: any) => err.type == "TS.Exception", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.Exception("Exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.Exception" && (err as TS.Exception).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.IndexOutOfRangeException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(() =>
      {
        throw new TS.IndexOutOfRangeException("IndexOutOfRange exception message");
      }, (err: any) => err.type == "TS.IndexOutOfRangeException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(() =>
      {
        throw new TS.IndexOutOfRangeException("IndexOutOfRange exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.IndexOutOfRangeException" && (err as TS.IndexOutOfRangeException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.InvalidCastException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidCastException("InvalidCast exception message");
      }, (err: any) => err.type == "TS.InvalidCastException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidCastException("InvalidCast exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.InvalidCastException" && (err as TS.InvalidCastException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.InvalidFormatException constructor", () =>
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidFormatException("ArgName", "NOP", "Invalid format exception message");
      }, (err: any) => err.type == "TS.InvalidFormatException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidFormatException("ArgName", "NOP", "Invalid format exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.InvalidFormatException" && (err as TS.InvalidFormatException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.InvalidInvocationException constructor", () =>
  {
    var ExceptionMessage = "InvalidInvocation exception message";

    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidInvocationException("InvalidInvocation exception message");
      }, (err: any) => err.type == "TS.InvalidInvocationException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidInvocationException("InvalidInvocation exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.InvalidInvocationException" && (err as TS.InvalidInvocationException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.InvalidOperationException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidOperationException("Invalid operation exception message");
      }, (err: any) => err.type == "TS.InvalidOperationException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidOperationException("Invalid operation exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.InvalidOperationException" && (err as TS.InvalidOperationException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.InvalidTypeException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidTypeException("ArgName", "NOP", "Invalid type exception message");
      }, (err: any) => err.type == "TS.InvalidTypeException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.InvalidTypeException("ArgName", "NOP", "Invalid type exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.InvalidTypeException" && (err as TS.InvalidTypeException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.NotFiniteNumberException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.NotFiniteNumberException("Not finite number exception message");
      }, (err: any) => err.type == "TS.NotFiniteNumberException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.NotFiniteNumberException("Not finite number exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.NotFiniteNumberException" && (err as TS.NotFiniteNumberException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.NotImplementedException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.NotImplementedException("NotImplemented exception message");
      }, (err: any) => err.type == "TS.NotImplementedException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.NotImplementedException("NotImplemented exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.NotImplementedException" && (err as TS.NotImplementedException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });


  suite("TS.OverflowException constructor", () => 
  {
    test("Should raise an exception instance that matched with the expected instance.", () => 
      {
    assert.throws(function ()
    {
      throw new TS.OverflowException("Overflow exception message");
    }, (err: any) => err.type == "TS.OverflowException", "Should raise an exception instance that matched with the expected instance.");
    });

    test("Should raise an exception instance of the expected type with an inner exception.", () => 
    {
      assert.throws(function ()
      {
        throw new TS.OverflowException("Overflow exception message", getInnerExcepton());
      }, (err: any) =>
        {
          return err.type == "TS.OverflowException" && (err as TS.OverflowException).innerException.message == getInnerExcepton().message;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });
  });

  /**
  *  @description Creates and returns a new exception of type TS.Exception with the message text: "Inner exception message".
  */
  function getInnerExcepton(): TS.Exception
  {
    return new TS.Exception("Inner exception message");
  }

});
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="DATA.ts" />
import * as assert from 'assert';
import {TS} from '../node_modules/typescript-linq/TS';
import {DATA} from './DATA';

suite("TS.Utils.Assert", () =>
{
  let custEnum = new TS.Linq.Enumerator<DATA.ICustomer>(DATA.CreateCustomerArray());
  let persEnum = new TS.Linq.Enumerator<DATA.IPerson>(DATA.CreatePersonArray());
  let ordEnum = new TS.Linq.Enumerator<DATA.IOrders>(DATA.CreateOrdersArray());
  let carEnum = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());
  let numEnum = new TS.Linq.Enumerator<number>(DATA.CreateNumberArray());
  let strEnum = new TS.Linq.Enumerator<string>(DATA.CreateStringArray());
  let lowCharEnum = new TS.Linq.Enumerator<string>(DATA.lowerCharArray);
  let UpCharEnum = new TS.Linq.Enumerator<string>(DATA.upperCharArray);

  class Customer01 extends DATA.Customer
  {
    private internalHairColor: string;

    get hairColor(): string
    {
      return this.internalHairColor;
    }

    constructor(hairColor: string, Address: string, City: string, CompanyName: string, ContactName: string, ContactTitle: string, Country: string, CustomerID: string, Fax: string, Phone: string, PostalCode: string, Region: string);
    constructor(hairColor: string);
    constructor()
    {
      if (arguments.length > 1)
      {
        super(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
      }
      else
      {
        super();
      }

      if (arguments.length > 0)
      {
        this.internalHairColor = arguments[0];
      }
      else
      {
        this.internalHairColor = "unknown";
      }
    }
  }


  suite("isBinaryString", () => 
  {
    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("0110101111000001"), "Should return true for a valid source value.");
    });

    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("1110101111000000"), "Should return true for a valid source value.");
    });

    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("0000000000000000"), "Should return true for a valid source value.");
    });

    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("1111111111111111"), "Should return true for a valid source value.");
    });

    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("1"), "Should return true for a valid source value.");
    });

    test("Should return true for a valid source value.", () =>
    {
      assert.ok(TS.Utils.Assert.isBinaryString("0"), "Should return true for a valid source value.");
    });

    test("Should return false for an invalid source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString("asdf"), "Should return false for an invalid source value.");
    });

    test("Should return false for an invalid source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString("1111 11111111111"), "Should return false for an invalid source value.");
    });

    test("Should return false for an invalid source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString("1111I1111111111"), "Should return false for an invalid source value.");
    });

    test("Should return false for an invalid source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString("0000O0000000000"), "Should return false for an invalid source value.");
    });

    test("Should return false for an empty source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString(""), "Should return false for an empty source value.");
    });

    test("Should return false for a null source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString(null), "Should return false for a null source value.");
    });

    test("Should return false for an undefined source value.", () =>
    {
      assert.ok(!TS.Utils.Assert.isBinaryString(undefined), "Should return false for an undefined source value.");
    });

  });


  suite("isInstanceOf", () => 
  {
    let testObj0: any;
    let testObj1: any;
    let testLiteralObj: any;

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

    test("Should return true for a valid object / type combination.", () =>
    {
      testObj0 = new DATA.Customer("Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(TS.Utils.Assert.isInstanceOf(testObj0, DATA.Customer), "Should return true for a valid object / type combination.");
    });

    test("Should return true for an object comparison with its base type.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(TS.Utils.Assert.isInstanceOf(testObj1, DATA.Customer), "Should return true for an object comparison with its base type.");
    });

    test("Should return true for an object comparison with its type.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(TS.Utils.Assert.isInstanceOf(testObj1, Customer01), "Should return true for an object comparison with its type.");
    });

    test("Should return false for an object comparison with a derived class.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, Customer01), "Should return false for an object comparison with a derived class.");
    });

    test("Should return false for a literal object compare to a class.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(!TS.Utils.Assert.isInstanceOf(testLiteralObj, DATA.Customer), "Should return false for a literal object compare to a class.");
    });

    test("Should return false for an object comparison with a literal object.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, testLiteralObj), "Should return false for an object comparison with a literal object.");
    });

    test("Should return false for an object compared to itself.", () =>
    {
      testObj1 = new Customer01("brown", "Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
      assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, testObj0), "Should return false for an object compared to itself.");
    });

  });


  suite("isPlainObject", () =>
  {
    test("Should return true for an empty literal object", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject({}), true, "Should return true for an empty literal object");
    });
    test("Should return true for a new created Object with argument 'null'.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject(new Object(null)), true, "Should return true for a new created Object with argument 'null'.");
    });
    test("Should return true for a plain none empty object.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject({ "one": 1, "two": 2 }), true, "Should return true for a plain none empty object.");
    });
    test("Should return false for a complex object.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject(new DATA.Car("SUBURA", 200, false, 2020, 50000)), false, "Should return false for a complex object.");
    });
    test("Should return false when called with an array argument.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject([1, 2, 3]), false, "Should return false when called with an array argument.");
    });
    test("Should return false when called with a null argument.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject(null), false, "Should return false when called with a null argument.");
    });
    test("Should return false when called with an undefined argument.", () =>
    {
      assert.equal(TS.Utils.Assert.isPlainObject(undefined), false, "Should return false when called with an undefined argument.");
    });
  });


  suite("isPlainObject", () =>
  {
    test("Should return true for a boolean value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(true), true, "Should return true for a boolean value.");
    });
    test("Should return true for a null value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(null), true, "Should return true for a null value.");
    });
    test("Should return true for an undefined value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(undefined), true, "Should return true for an undefined value.");
    });
    test("Should return true for an integer number value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(12), true, "Should return true for an integer number value.");
    });
    test("Should return true for a floating point number value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(1.2), true, "Should return true for a floating point number value.");
    });
    test("Should return true for a symbol value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(Symbol()), true, "Should return true for a symbol value.");
    });
    test("Should return false for a boolean object value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(new Boolean(false)), false, "Should return false for a boolean object value.");
    });
    test("Should return false for a number object value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(new Number(12)), false, "Should return false for a number object value.");
    });
    test("Should return false for a string object value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType(new String("two")), false, "Should return false for a string object value.");
    });
    test("Should return false for a literal object value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType({}), false, "Should return false for a literal object value.");
    });
    test("Should return false for an array value.", () =>
    {
      assert.equal(TS.Utils.Assert.isPrimitiveType([1, 2, 3]), false, "Should return false for an array value.");
    });
  });
});
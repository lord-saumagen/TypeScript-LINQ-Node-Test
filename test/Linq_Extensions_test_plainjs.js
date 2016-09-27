"use strict";
/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
const TS_1 = require('../node_modules/@typescript/linq/TS');
const TS = TS_1.TS;
const DATA_1 = require('./DATA');
const DATA = DATA_1.DATA;
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
suite("TS.Linq.Extensions (plain js)", () =>
{
  before(function ()
  {
    // runs before all tests in this block
    custEnum = new TS.Linq.Enumerator(DATA.CreateCustomerArray());
    persEnum = new TS.Linq.Enumerator(DATA.CreatePersonArray());
    ordEnum = new TS.Linq.Enumerator(DATA.CreateOrdersArray());
    numEnum = new TS.Linq.Enumerator(DATA.CreateNumberArray());
    carEnum = new TS.Linq.Enumerator(DATA.CreateCarsArray());
    strEnum = new TS.Linq.Enumerator(DATA.CreateStringArray());
    lowCharEnum = new TS.Linq.Enumerator(DATA.lowerCharArray);
    createNumberArray = DATA.CreateNumberArray;
    createStringArray = DATA.CreateStringArray;
    createCarsArray = DATA.CreateCarsArray;
    createCarsUnionTestArray = DATA.CreateCarsUnionTestArray;
    createProductArray = DATA.CreateProductArray;
    createSortTestArray = DATA.CreateSortTestArray;
    createRandomNumberArray = DATA.CreateRandomNumberArray;
    createCustomerArray = DATA.CreateCustomerArray;
  });


  suite("aggregate (plain js)", () =>
  {

    test("The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate({ firstName: "John", lastName: "Doe" }, (first, second) => { return { firstName: first.firstName + ", " + second.firstName, lastName: first.lastName + ", " + second.lastName }; }, null);
      }, TS.InvalidTypeException, "The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");
    });

    test("The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'accumulator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.aggregate(new TS.Linq.Enumerator(DATA.lowerCharArray), new DATA.Car(), null);
      }, TS.InvalidTypeException, "The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'accumulator' argument type.");
    });
  });


  suite("all (plain js)", () =>
  {

    test("The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all(new TS.Linq.Enumerator(createStringArray()), {});
      }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'predicate' argument type.");
    });

    test("The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.all({}, () => false);
      }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");
    });
  });


  suite("any (plain js)", () =>
  {

    test("The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.any({}, () => false);
      }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");
    });


    test("The all function should fail with a \"TS.InvalidTypeException\" fo ra call with an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.any(new TS.Linq.Enumerator(createStringArray()), {});
      }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" fo ra call with an invalid 'predicate' argument type.");
    });
  });


  suite("average (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.average({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.average(new TS.Linq.Enumerator([1, 2, 3, {}, ""]));
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");
    });
  });


  suite("concat (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat({}, new TS.Linq.Enumerator(createStringArray()));
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.concat(new TS.Linq.Enumerator(createStringArray()), {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument.");
    });
  });


  suite("contains (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.contains(new TS.Linq.Enumerator(createStringArray()), "NOP", {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
    });
  });


  suite("count (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.count({}, (item) => { return true; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.count(numEnum, "");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("cycle (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.cycle({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });
  });


  suite("defaultIfEmpty (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.defaultIfEmpty({}, "Five");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });
  });


  suite("distinct (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.distinct({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.distinct(carEnum, "Five");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
    });
  });


  suite("elementAt (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.elementAt({}, "Five");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.elementAt(carEnum, "Five");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.");
    });
  });


  suite("elementAtOrDefault (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.elementAtOrDefault({}, 2, DATA.Car);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.elementAtOrDefault(carEnum, "2", DATA.Car);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.");
    });
  });


  suite("except (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.except({}, carEnum);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.except(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.except(carEnum, carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
    });
  });


  suite("first (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerable' argument type.", () => {
      assert.throws(() => {
        TS.Linq.Extensions.first({}, (item) => { return true; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerable' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>  {
      assert.throws(() =>  {
        TS.Linq.Extensions.first(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });

  });


  suite("firstOrDefault (plain js)", () =>
  {

    test("Should return a default object if the predicate is erroneous.", () =>
    {
      let resultCar = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item) => { return item.NOP == "NOP" });
      assert.deepEqual(resultCar, new DATA.Car(), "Should return a default object if the predicate is erroneous.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () => {
      assert.throws(() =>  {
        TS.Linq.Extensions.firstOrDefault({}, DATA.Car, (item) => { return true; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () => {
      assert.throws(() => {
        TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("forEach (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach({}, (item) => { });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'action' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.forEach(TS.Linq.Enumerator.Empty, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'action' argument.");
    });

  });


  suite("groupBy (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy({}, (Item) => { return Item.Currency })
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument.", () =>
    {
      let productEnumerator = new TS.Linq.Enumerator(createProductArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(productEnumerator, {})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.", () =>
    {
      let productEnumerator = new TS.Linq.Enumerator(createProductArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(productEnumerator, (Item) => { return Item.Currency }, {})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'elementSelector' argument.", () =>
    {
      let productEnumerator = new TS.Linq.Enumerator(createProductArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupBy(productEnumerator, (Item) => { return Item.Currency }, (first, second) => { return first === second; }, {})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'elementSelector' argument.");
    });
  });


  suite("groupJoin (plain js)", () =>
  {

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(null, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(undefined, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin({}, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, null, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, undefined, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerable' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, {}, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerable' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, {}, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.");
    });

    test("Should throw a 'TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, {}, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
      }, TS.InvalidTypeException, "Should throw a 'TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; }, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.");
    });
  });


  suite("intersect (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for a invalid 'firstEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect({}, TS.Linq.Enumerator.Empty);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'firstEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a invalid 'secondEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(TS.Linq.Enumerator.Empty, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'secondEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a invalid 'equalityComparer' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.intersect(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'equalityComparer' argument.");
    });
  });


  suite("join (plain js)", () =>
  {

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(null, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(undefined, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join({}, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, null, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, undefined, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, {}, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerator' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(ordEnum, ordEnum, {}, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, {}, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.");
    });
  });


  suite("last (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.last({}, (item) => { return true; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.last(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("lastOrDefault (plain js)", () => 
  {

    test("Should return a default object if the predicate is erroneous.", () =>
    {
      let resultCar = TS.Linq.Extensions.lastOrDefault(carEnum, DATA.Car, (item) => { return item.NOP == "NOP" });
      assert.deepEqual(resultCar, new DATA.Car(), "Should return a default object if the predicate doesn't qualify an element as result.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.lastOrDefault({}, DATA.Car, (item) => { return true; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.lastOrDefault(carEnum, DATA.Car, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("max (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.max({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.", () =>
    {
      let strEnum = new TS.Linq.Enumerator(createStringArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.max(strEnum);
      }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.");
    });
  });


  suite("min (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.min({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.", () =>
    {
      let strEnum = new TS.Linq.Enumerator(createStringArray());
      assert.throws(() =>
      {
        TS.Linq.Extensions.min(strEnum);
      }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.");
    });
  });


  suite("orderBy (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy({}, (item) => { return item; }, (first, second) => { return first == second; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(carEnum, {}, (first, second) => { return first == second; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderBy(carEnum, (item) => { return item; }, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
    });
  });


  suite("orderByDescending (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending({}, (item) => { return item; }, (first, second) => { return first == second; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(carEnum, {}, (first, second) => { return first == second; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.orderByDescending(carEnum, (item) => { return item; }, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
    });
  });


  suite("range (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'start' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range({}, 5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'start' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.range(12, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
    });
  });


  suite("repeat (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.repeat("NOP", {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
    });
  });


  suite("reverse (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        let result = TS.Linq.Extensions.reverse(4.5);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });
  });


  suite("select (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        let resultArray = TS.Linq.Extensions.select({}, (item) => { return item; }).toArray();
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      assert.throws(() =>
      {
        let resultArray = TS.Linq.Extensions.select(carEnum, false).toArray();
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });
  });


  suite("selectMany (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        let resultArray = TS.Linq.Extensions.selectMany({}, (item) => { return item.subitem; }).toArray();
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      assert.throws(() =>
      {
        let resultArray = TS.Linq.Extensions.selectMany(carEnum, false).toArray();
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });
  });


  suite("sequenceEqual (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual({}, numEnum);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(numEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sequenceEqual(numEnum, numEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
    });
  });


  suite("skip (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skip({}, 50);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skip(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
    });
  });


  suite("skipWhile (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile({}, (item) => { return item.name != "VW"; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.skipWhile(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("sum (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum({});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.sum(new TS.Linq.Enumerator([1, 2, 3, {}, ""]), {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });
  });


  suite("take (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.take({}, 50);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.take(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
    });
  });


  suite("takeWhile (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() => 
      {
        TS.Linq.Extensions.takeWhile(carEnum, "NOP");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("thenBy (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      let sortTestEnumerator = new TS.Linq.Enumerator(createSortTestArray());
      let orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenBy(orderedEnumerator, "NOP");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.", () =>
    {
      let sortTestEnumerator = new TS.Linq.Enumerator(createSortTestArray());
      let orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenBy(orderedEnumerator, (item) => { return item; }, "NOP");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
    });
  });


  suite("thenByDescending (plain js)", () =>
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.", () =>
    {
      let sortTestEnumerator = new TS.Linq.Enumerator(createSortTestArray());
      let orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenByDescending(orderedEnumerator, "NOP");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.", () =>
    {
      let sortTestEnumerator = new TS.Linq.Enumerator(createSortTestArray());
      let orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenByDescending(orderedEnumerator, (item) => { return item; }, "NOP");
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
    });
  });


  suite("toArray (plain js)", () =>
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toArray({})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")
    });
  });


  suite("toDictionary (plain js)", () =>
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toDictionary({}, item => item)
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toDictionary([1, 2], {})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument type.")
    });
  });


  suite("toList (plain js)", () =>
  {
    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.toList({})
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")
    });
  });


  suite("union (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.union({}, carEnum);
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.union(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");
    });
  });


  suite("where (plain js)",() =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.where({}, (item) => { return item.name != "VW"; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.where(carEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
    });
  });


  suite("zip (plain js)", () =>
  {

    test("The call should fail with a \"TS.InvalidTypeException\" for a 'firstEnum' argument which is not iterable.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.zip({}, custEnum, (num, cust) => { return {}; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'firstEnum' argument which is not iterable.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a 'secondEnum' argument which is not iterable.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.zip(numEnum, {}, (num, cust) => { return {}; });
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'secondEnum' argument which is not iterable.");
    });

    test("The call should fail with a \"TS.InvalidTypeException\" for a 'func' which is not a function.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.zip(numEnum, custEnum, {});
      }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'func' which is not a function.");
    });
  });

});
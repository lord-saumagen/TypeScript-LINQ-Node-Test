/// <reference path="../Scripts/typings/mocha/mocha.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
import {TS} from '../node_modules/@typescript/linq/TS';
import * as DATA from './DATA';
import * as assert from 'assert';

var custEnum: TS.Linq.Enumerator<DATA.DATA.ICustomer>;
var persEnum: TS.Linq.Enumerator<DATA.DATA.IPerson>;
var ordEnum: TS.Linq.Enumerator<DATA.DATA.IOrders>;
var numEnum: TS.Linq.Enumerator<number>;
var createStringArray: () => Array<string>;
var createNumberArray: () => Array<number>;
var createCarsArray: () => Array<DATA.DATA.ICar>;
var createCarsUnionTestArray: () => Array<DATA.DATA.Car>;
var createProductArray: () => Array<DATA.DATA.IProduct>;
var createSortTestArray: () => Array<DATA.DATA.ISortTestItem>;
var createRandomNumberArray: (numbers: number) => Array<number>;

suite("TS.Linq.OrderedEnumerator", () =>
{
  before(function ()
  {
    // runs before all tests in this block
    custEnum = new TS.Linq.Enumerator<DATA.DATA.ICustomer>(DATA.DATA.CreateCustomerArray());
    persEnum = new TS.Linq.Enumerator<DATA.DATA.IPerson>(DATA.DATA.CreatePersonArray());
    ordEnum = new TS.Linq.Enumerator<DATA.DATA.IOrders>(DATA.DATA.CreateOrdersArray());
    numEnum = new TS.Linq.Enumerator<number>(DATA.DATA.CreateNumberArray());
    createNumberArray = DATA.DATA.CreateNumberArray;
    createStringArray = DATA.DATA.CreateStringArray;
    createCarsArray = DATA.DATA.CreateCarsArray;
    createCarsUnionTestArray = DATA.DATA.CreateCarsUnionTestArray;
    createProductArray = DATA.DATA.CreateProductArray;
    createSortTestArray = DATA.DATA.CreateSortTestArray;
    createRandomNumberArray = DATA.DATA.CreateRandomNumberArray;
  });

  suite("constructor", () =>
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<any, string>;
    let resultArray: Array<any>;

    test("The constructor should return an object when called with proper arguments.", () =>
    {
      orderedEnumerator = new TS.Linq.OrderedEnumerator<any, string>(createSortTestArray(), item => item.color, (first: string, second: string) => first.localeCompare(second));
      assert.notEqual(orderedEnumerator, null, "The constructor should return an object when called with proper arguments.");
    });

    test("The returned object should be iterable.", () =>
    {
      orderedEnumerator = new TS.Linq.OrderedEnumerator<any, string>(createSortTestArray(), item => item.color, (first: string, second: string) => first.localeCompare(second));
      assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
    });

    test("Should hold as much elements as originally used during construction.", () =>
    {
      resultArray = orderedEnumerator.toArray();

      assert.equal(resultArray.length, createSortTestArray().length, "Should hold as much elements as originally used during construction.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(null, (item) => item, (first, second) => 0);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'enumerator' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, null, (first, second) => 0);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'keySelector' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'comparer' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, (item) => item, null);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'comparer' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(undefined, (item) => item, (first, second) => 0);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'enumerator' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, undefined, (first, second) => 0);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'keySelector' argument.");
    });

    test("The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'comparer' argument.", () =>
    {
      assert.throws(() =>
      {
        let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, (item) => item, undefined);
      }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'comparer' argument.");
    });
  });


  suite("thenBy", () => 
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<DATA.DATA.ISortTestItem, string>;
    let resultArray: Array<DATA.DATA.ISortTestItem>;
    let sortedByColor: boolean;
    let sortedByLocation: boolean;
    let colorsArray: Array<string> = ["red", "blue", "green"];

    test("The call to 'thenBy' should return an object.", () =>
    {
      orderedEnumerator = new TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
      orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
      assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
    });

    test("The returned object should be iterable.", () =>
    {
      orderedEnumerator = new TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
      orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
      assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
    });

    test("The result array should be sorted by color in the first place.", () =>
    {
      //
      //Check that the items are sorted by color as 
      //expected.
      //
      orderedEnumerator = new TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
      orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
      resultArray = orderedEnumerator.toArray();
      sortedByColor = true;
      let lastItem: DATA.DATA.ISortTestItem = null;
      for (let item of resultArray)
      {

        if (lastItem != null)
        {
          if (lastItem.color > item.color)
          {
            sortedByColor = false;
            break;
          }//END if
        }//END if

        lastItem = item;
      }//END for

      assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");
    });

    test("The result array should be sorted by location in the second place.", () =>
    {
      //
      //Check that in each color group the items 
      //are sorted by location as expected.
      //
      orderedEnumerator = new TS.Linq.Enumerator(createSortTestArray()).orderBy(item => item.color);
      orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
      sortedByLocation = true;
      for (let color of colorsArray)
      {
        let colorGroupArray: Array<DATA.DATA.ISortTestItem> = resultArray.filter(Item => Item.color == color);
        let lastItem: DATA.DATA.ISortTestItem = null;

        for (let item of colorGroupArray)
        {
          if (lastItem != null)
          {
            if (lastItem.location > item.location)
            {
              sortedByLocation = false;
              break;
            }//END if
          }//END if

          lastItem = item;
        }
      }

      assert.ok(sortedByLocation, "The result array should be sorted by location in the second place.");
    });

    test("An empty OrderedEnumerator should stay empty even after subsequent sort requests.", () =>
    {
      orderedEnumerator = TS.Linq.OrderedEnumerator.Empty.thenBy(Item => Item.location);
      assert.equal(orderedEnumerator.count(), 0, "An empty OrderedEnumerator should stay empty even after subsequent sort requests.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" when called with a null 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        orderedEnumerator.thenBy(null);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" when called with a null 'keySelector' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  when called with an undefined 'keySelector' argument.", () =>
    {
      assert.throws(() =>
      {
        orderedEnumerator.thenBy(undefined);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  when called with an undefined 'keySelector' argument.");
    });
  });


  suite("thenByDescending", () =>
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<DATA.DATA.ISortTestItem, any>;
    let resultArray: Array<DATA.DATA.ISortTestItem>;
    let sortedByColor: boolean;
    let sortedByLocation: boolean;
    let colorsArray: Array<string> = ["red", "blue", "green"];

    test("The call to 'thenBy' should return an object.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
      orderedEnumerator = TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(orderedEnumerator, Item => Item.location);
      assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
    });

    test("The returned object should be iterable.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
      orderedEnumerator = TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(orderedEnumerator, Item => Item.location);
      assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
    });

    test("The result array should be sorted by color in the first place.", () =>
    {
      //
      //Check that the items are sorted by color as 
      //expected.
      //
      orderedEnumerator = TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
      orderedEnumerator = TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(orderedEnumerator, Item => Item.location);
      sortedByColor = true;
      let lastItem: DATA.DATA.ISortTestItem = null;
      for (let item of orderedEnumerator)
      {

        if (lastItem != null)
        {
          if (lastItem.color > item.color)
          {
            sortedByColor = false;
            break;
          }//END if
        }//END if

        lastItem = item;
      }//END for

      assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");
    });

    test("The result array should be sorted by location descending in the second place.", () =>
    {
      //
      //Check that in each color group the items 
      //are sorted by location as expected.
      //
      orderedEnumerator = TS.Linq.Extensions.orderBy(createSortTestArray(), (Item => Item.color));
      orderedEnumerator = TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(orderedEnumerator, Item => Item.location);
      resultArray = TS.Linq.Extensions.toArray(orderedEnumerator);
      sortedByLocation = true;
      for (let color of colorsArray)
      {
        let colorGroupArray: Array<DATA.DATA.ISortTestItem> = resultArray.filter(Item => Item.color == color);
        let lastItem: DATA.DATA.ISortTestItem = null;

        for (let item of colorGroupArray)
        {
          if (lastItem != null)
          {
            if (lastItem.location < item.location)
            {
              sortedByLocation = false;
              break;
            }//END if
          }//END if

          lastItem = item;
        }
      }

      assert.ok(sortedByLocation, "The result array should be sorted by location descending in the second place.");
    });

    test("Should return an empty enumerator when called with an empty enumerator.", () =>
    {
      orderedEnumerator = TS.Linq.Extensions.thenByDescending<any, any>(TS.Linq.OrderedEnumerator.Empty, Item => Item.location);
      assert.equal(TS.Linq.Extensions.count(orderedEnumerator), 0, "Should return an empty enumerator when called with an empty enumerator.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(null, Item => Item.location);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");
    });

    test("The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.", () =>
    {
      assert.throws(() =>
      {
        TS.Linq.Extensions.thenByDescending<DATA.DATA.ISortTestItem, string>(undefined, Item => Item.location);
      }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
    });
  });

});
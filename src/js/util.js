/*
  Standardize data set so that variations of a value can be lumped together.

  @param rules = {
    'vehicle' : ['vehicle', 'Car Bomb', 'Car Bomb (Motorcycle)'],
    'vest' : ['vest']
  }
  @param groupUnmatched = boolean; if value does not match any rules, lump it into a group called "other"

  NOTE: rules in this function are case-sensitive
*/
const standardizeByKey = (data, key, rules, combineRest) => {
  return data.map((d) => {
    //The current value for the given key
    const val = d[key];

    //The matching value that will replace the current value
    //(Will return undefined if no match)
    const group = Object.keys(rules).find(r => rules[r].includes(val));

    //New object to merge with existing record.
    const update = {};

    //Group values by rules, group non-matches into category "other"
    update[key] = group || (combineRest ? 'other' : val);

    //Return the merged object
    return Object.assign({}, d, update)
  });
};

//Sort an array of records by a given key
const sort = (arr, key) => {
  //If returned value is <0, a should come first in array
  //If returned value is >0, b should come first in array
  return arr.slice(0).sort((a, b) => {
    let valueA = a[key].toUpperCase();
    let valueB = b[key].toUpperCase();

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    return 0;
  })
};

/*
  Sort an array of records by a given key into a given order

  order: ['red', 'green', 'blue']
*/
var sortInto = function(arr, key, order) {
  //Create a copy and sort
  return arr.slice(0).sort(function(a, b) {
    const valueA = a[key];
    const valueB = b[key];
    const indexOfA = order.indexOf(valueA);
    const indexOfB = order.indexOf(valueB);
    //Send items that are not included in order to back of list.
    const orderA = indexOfA !== -1 ? indexOfA : order.length;
    const orderB = indexOfB !== -1 ? indexOfB : order.length;
    return orderA - orderB;
  });
};

//Transform a string so it can be used as a CSS class or JS variable
const classify = (str) => {
  return str.replace(/[\W]/gi, '').toLowerCase();
}

//Group an array of objects by each object's key
//Returns an object that can be destructured
const group = (data, key) => {
  const collection = {};

  //Get array of every value for a given key
  const allValues = Object.values(data).map((d) => {
    return d[key];
  });
  //Find the unique values
  const uniqueValues = [...new Set(allValues)];
  //Create an array for each unique value
  uniqueValues.forEach((d) =>  {
    collection[d] = [];
  });
  //Sort into arrays
  data.forEach((d) => {
    const value = d[key];
    collection[value].push(d);
  });

  return collection;
};

/*
rule = {
  'group1' : ['expectedValue1', 'expectedValue2'],
  'group2' : ['expectedValue3'],
}
*/
const groupInto = (data, key, rules) => {
  //Set up arrays to collection data records
  const collection = {};
  Object.keys(rules).forEach((r) => {
    collection[r] = [];
  });
  collection.other = [];

  data.forEach((d) => {
    //The value of the key that we are examining
    const val = d[key];

    //Which group does the record belong to?
    const groupKey = Object.keys(rules).find(r => {
      return rules[r].includes(val);
    });

    //Collect in matching group, or catch-all "other" group
    if (groupKey) {
      collection[groupKey].push(d);
    } else {
      collection.other.push(d)
    }
  });

  return  collection;
}

export {
  classify,
  standardizeByKey,
  group,
  groupInto,
  sort,
  sortInto
};

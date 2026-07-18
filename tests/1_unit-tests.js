const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function() { assert.equal(convertHandler.getNum('32L'), 32); });
    test('Decimal number input', function() { assert.equal(convertHandler.getNum('3.25L'), 3.25); });
    test('Fractional input', function() { assert.equal(convertHandler.getNum('1/2km'), 0.5); });
    test('Fractional input with a decimal', function() { assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8); });
    test('Invalid input on a double-fraction', function() { assert.isUndefined(convertHandler.getNum('3/2/3kg')); });
    test('No numerical input', function() { assert.equal(convertHandler.getNum('kg'), 1); });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('For each valid unit input', function() {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((ele, i) => { assert.equal(convertHandler.getUnit(`32${ele}`), expected[i]); });
    });
    test('Unknown unit input', function() { assert.isUndefined(convertHandler.getUnit('32g')); });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For each valid unit input', function() {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, i) => { assert.equal(convertHandler.getReturnUnit(ele), expected[i]); });
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('For each valid unit input', function() {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => { assert.equal(convertHandler.spellOutUnit(ele), expected[i]); });
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function() { assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001); });
    test('L to Gal', function() { assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001); });
    test('Mi to Km', function() { assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001); });
    test('Km to Mi', function() { assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001); });
    test('Lbs to Kg', function() { assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001); });
    test('Kg to Lbs', function() { assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001); });
  });

});

// how to unit test
// testing tools
const { test } = require('node:test')
const assert = require('node:assert')

// methods to test
const reverse = require('../utils/for_testing').reverse


/** 
test function -  2 para
1 = test description
2 = function that actually tests the method in subject
**/
test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})

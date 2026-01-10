const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}


// reducer = function to be performed
// .reduce() -> allows a function para to be performed per item in an array
//              reduces the array items into 1 item/value
//              (cumulative, current)
// with an initial value (in this case, 0)
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}
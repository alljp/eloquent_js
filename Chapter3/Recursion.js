function isOddEven (n) {
  if (n === 0) {
    return 'Even'
  } else if (n === 1) {
    return 'Odd'
  } else {
    return isOddEven(n - 2)
  }
}

console.log(isOddEven(41))

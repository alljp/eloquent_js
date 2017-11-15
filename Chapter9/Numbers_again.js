let number = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/

// Tests:
let arr = ['1', '-1', '+15', '1.55', '.5', '5.', '1.3e2', '1E-4', '1e+12']
arr.forEach(function (s) {
  if (!number.test(s)) console.log('Failed to match "' + s + '"')
})

arr = ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.', '1e']
arr.forEach(function (s) {
  if (number.test(s)) console.log('Incorrectly accepted "' + s + '"')
})

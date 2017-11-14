function range (start, end, step) {
  let out = []
  if (step === undefined) step = 1
  if (step > 1 && start < end) {
    for (let i = start; i < end; i += step) {
      out.push(i)
    }
  } else if (step < 1 && start > end) {
    for (let i = start; i > end; i += step) {
      out.push(i)
    }
  }
  return out
}

function sum (arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

console.log(sum(range(2, 7, 2))) // 12
console.log(range(5, 1, -1))     // [ 5, 4, 3, 2 ]
console.log(range(2, 4, 0))      // []
console.log(range(1, 2, -1))     // []
console.log(range(4, 1))         // []

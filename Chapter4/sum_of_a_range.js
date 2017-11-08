function range (start, end, step) {
  let out = []
  if (step === undefined) step = 1
  for (let i = start; i < end; i += step) {
    out.push(i)
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

console.log(sum(range(2, 7, 2)))

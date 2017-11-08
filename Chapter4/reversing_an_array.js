function reverseArray (arr) {
  let out = []
  for (let i = arr.length - 1; i >= 0; i--) {
    out.push(arr[i])
  }
  return out
}

function reverseArrayInPlace (arr) {
  let tmp
  let t = arr.length - 1
  for (let i = 0; i < arr.length / 2; i++) {
    tmp = arr[i]
    arr[i] = arr[t - i]
    arr[t - i] = tmp
  }
  return arr
}

console.log(reverseArray([2, 3, 4, 5, 6]))
console.log(reverseArrayInPlace([2, 3, 4, 5, 6]))

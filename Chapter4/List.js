function arrayToList (arr) {
  let list = null
  for (let i = arr.length - 1; i >= 0; i--) {
    list = {value: arr[i], rest: list}
  return list
}

function listToArray (list) {
  let arr = []
  while (list.rest) {
    arr.push(list.value)
    list = list.rest
  }
  return arr
}

function prepend (list, value) {
  return {value: value, rest: list}
}

function nth (list, n) {
  if (!list) {
    return undefined
  } else if (n === 0) {
    return list.value
  } else return nth(list.rest, n - 1)
}

console.log(arrayToList([1, 2, 3, 4]))
let list = arrayToList([1, 2, 3, 4])
console.log(listToArray(list))
console.log(prepend(list, 0))
console.log(nth(list, 2))
console.log(nth(list, 7))

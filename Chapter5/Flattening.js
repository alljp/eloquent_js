function flatten (arr) {
  return arr.reduce(function (a, b) {
    return a.concat(b)
  })
}

console.log(flatten([[1], [2, 3], [4, 3, 2, 1]]))

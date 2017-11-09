const ANCESTORY_FILE = require('./Ancestory.js')
let ancestory = JSON.parse(ANCESTORY_FILE)
let byCentury = {}

function average (array) {
  function plus (a, b) { return a + b }
  return array.reduce(plus) / array.length
}

for (let person in ancestory) {
  if (byCentury[Math.ceil(ancestory[person].died / 100)] === undefined) {
    byCentury[Math.ceil(ancestory[person].died / 100)] = [ancestory[person].died - ancestory[person].born]
  } else {
    byCentury[Math.ceil(ancestory[person].died / 100)].push(ancestory[person].died - ancestory[person].born)
  }
}

for (let century in byCentury) {
  console.log(century + ': ', average(byCentury[century]))
}

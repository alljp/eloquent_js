function ArraySeq (array) {
  this.array = array
  this.pos = -1
}

ArraySeq.prototype.next = function () {
  this.pos++
  if (this.pos >= this.array.length) {
    return false
  }
  return true
}

ArraySeq.prototype.current = function () {
  return this.array[this.pos]
}

function RangeSeq (from, to) {
  this.to = to
  this.cur = from - 1
}

RangeSeq.prototype.next = function () {
  this.cur++
  if (this.cur >= this.to) {
  	return false
  }
  return true
}

RangeSeq.prototype.current = function () {
  return this.cur
}

function logFive (seq) {
  for (let i = 0; i < 5 && seq.next(); i++) {
    console.log(seq.current())
  }
}

logFive(new ArraySeq([1, 2, 3]))
logFive(new RangeSeq(1, 5))

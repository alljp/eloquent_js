let month = (function () {
  let names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return {
  	name: function (number) { return names[number] },
  	number: function (name) { return names.indexOf(name) }
  }
}())

console.log(month.name(2))
console.log(month.number('Mar'))
console.log(month.name(month.number('Feb')))

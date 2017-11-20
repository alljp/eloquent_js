function buildTable (data) {
  let table = document.createElement('table')

  let fields = Object.keys(data[0])
  let headRow = document.createElement('tr')
  fields.forEach(function (field) {
    let headCell = document.createElement('th')
    headCell.textContent = field
    headRow.appendChild(headCell)
  })
  table.appendChild(headRow)
  data.forEach(function (object) {
    let row = document.createElement('tr')
    fields.forEach(function (field) {
      let cell = document.createElement('td')
      cell.textContent = object[field]
      if (typeof object[field] === 'number') {
        cell.style.textAlign = 'right'
      }
      row.appendChild(cell)
    })
    table.appendChild(row)
  })
  return table
}
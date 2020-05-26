export const makeRandomMap = () => {
  const field = new Array(1600).fill(0)
  let newField = []
  newField = field.map(tile => {
    let rand = Math.random()
    if (rand > 0.6) {
      tile = 1
    }
    return tile
  })
  return newField
}

function onlyUnique (value, index, self) {
  return self.indexOf(value) === index
}

export function makeCheckArr (field) {
  let size = Math.sqrt(field.length)
  let checkArr = []
  field.forEach((cell, idx) => {
    if (cell === 1) {
      let neighbours = getNeighbours(idx, size)
      checkArr = checkArr.concat(neighbours)
      checkArr.push(idx)
    }
  })
  checkArr = checkArr.filter(onlyUnique)
  return checkArr
}

function updateCheckArr (arr){

}

export function nextGeneration (field, checkArr) {
  let size = Math.sqrt(field.length)
  console.log('checkArr is:', checkArr)
  let nextField = []
  for (let i = 0; i < field.length; i++) {
    let f = field[i]
    let n = getNeighbours(i, size)
    let ln = findLiveNeighbours(field, n)
    if (f === 0 && ln === 3) {
      f = 1
    } else if (f === 1 && (ln === 2 || ln === 3)) {
      f = 1
    } else {
      f = 0
    }
    nextField.push(f)
  }
  return nextField
}

export function getNeighbours (ind, size) { // (index being looked up, square root of array length)
  let neighbours = []
  let relPowerTen = Math.floor(Math.log10(size) + 1) //
  let col = (ind / size) % 1 // finds the value corresponding to the column of index being checked
  let row = ((Math.floor(ind / size)) / size) // finds the value corresponding to the row of index being checked
  col = Math.round(col * Math.pow(10, relPowerTen)) / Math.pow(10, relPowerTen)
  row = Math.round(row * Math.pow(10, relPowerTen)) / Math.pow(10, relPowerTen) // attempts to avoid rounding errors
  for (let i = 0; i < 9; i++) {
    let itRow = Math.floor(i / 3) - 1 // changes the operation to perform on the row variable
    let itCol = (i % 3) - 1 // changes the operation to perform on the col variable
    let rowModified = ((row + 1) + (itRow * (1 / size))) % 1 // alters the row value to return the row value of the neighbour
    let colModified = ((col + 1) + (itCol * (1 / size))) % 1 // alters the col value to return the col value of the neighbour
    if (i !== 4) { // prevents adding index being checked to list of neighbours
      let calc = Math.round(rowModified * size) + colModified // turns rowmod into an integer, adds colmod. New value represents coordinates of neighbour
      calc = Math.round(calc * size) // converts the calc value into the index number of the neighbour
      neighbours.push(calc)
    }
  }
  return neighbours
}

export function findLiveNeighbours (field, neighbours) {
  let liveNeighbours = 0
  for (let i = 0; i < 8; i++) {
    liveNeighbours += field[neighbours[i]]
  }
  return liveNeighbours
}

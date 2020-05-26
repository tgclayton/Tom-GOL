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

function updateCheckArr (arr) {

}

export function nextGeneration (field, checkArr, size) {
  // console.log('checkArr in nextgen was:', checkArr)
  size--
  let liveCount = 0
  let newCheck = []
  let newField = [...field]
  checkArr.forEach(idx => {
    let n = getNeighbours(idx, size)
    let ln = findLiveNeighbours(field, n)
    if (field[idx] === 0 && ln === 3) {
      newField[idx] = 1
      liveCount++
      newCheck = newCheck.concat(n)
      newCheck.push(idx)
    } else if (field[idx] === 1 && (ln === 2 || ln === 3)) {
      newField[idx] = 1
      newCheck = newCheck.concat(n)
      newCheck.push(idx)
      liveCount++
    } else {
      newField[idx] = 0
    }
  })
  newCheck = newCheck.filter(onlyUnique)
  return [newField, liveCount, newCheck]
}

export function idxToCoords (idx) {
  var x = idx % 40
  var y = Math.floor(idx / 40)
  return [x, y]
}

export function coordsToIdx (coords) {
  let x = coords[0]
  let y = coords[1] * 40
  let idx = x + y
  return idx
}

export function getNeighbours (idx, size) {
  size = 39
  let neighbours = []
  let targetCoords = idxToCoords(idx)
  for (let i = 0; i < 9; i++) {
    let itx = Math.floor(i / 3) - 1
    let ity = (i % 3) - 1
    let newX = targetCoords[0] + itx
    if (newX < 0) {
      newX = size
    } else if (newX > size) {
      newX = 0
    }
    let newY = targetCoords[1] + ity
    if (newY < 0) {
      newY = size
    } else if (newY > size) {
      newY = 0
    }
    if (i !== 4) {
      neighbours.push(coordsToIdx([newX, newY]))
    }
  }
  return neighbours
}

// export function oldgetNeighbours (ind, size) { // (index being looked up, square root of array length)
//   let neighbours = []
//   let relPowerTen = Math.floor(Math.log10(size) + 1) //
//   let col = (ind / size) % 1 // finds the value corresponding to the column of index being checked
//   let row = ((Math.floor(ind / size)) / size) // finds the value corresponding to the row of index being checked
//   col = Math.round(col * Math.pow(10, relPowerTen)) / Math.pow(10, relPowerTen)
//   row = Math.round(row * Math.pow(10, relPowerTen)) / Math.pow(10, relPowerTen) // attempts to avoid rounding errors
//   for (let i = 0; i < 9; i++) {
//     let itRow = Math.floor(i / 3) - 1 // changes the operation to perform on the row variable
//     let itCol = (i % 3) - 1 // changes the operation to perform on the col variable
//     let rowModified = ((row + 1) + (itRow * (1 / size))) % 1 // alters the row value to return the row value of the neighbour
//     let colModified = ((col + 1) + (itCol * (1 / size))) % 1 // alters the col value to return the col value of the neighbour
//     if (i !== 4) { // prevents adding index being checked to list of neighbours
//       let calc = Math.round(rowModified * size) + colModified // turns rowmod into an integer, adds colmod. New value represents coordinates of neighbour
//       calc = Math.round(calc * size) // converts the calc value into the index number of the neighbour
//       neighbours.push(calc)
//     }
//   }
//   return neighbours
// }

export function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

export const makeRandomMap = (size) => {
  const tileTotal = size * size
  const field = new Array(tileTotal).fill(0)
  let newField = []
  newField = field.map(tile => {
    let rand = Math.random()
    if (rand > 0.8) {
      tile = 1
    }
    return tile
  })
  return newField
}

// function onlyUnique (value, index, self) {
//   return self.indexOf(value) === index
// }

// export function makeCheckArr (field) {
//   let size = Math.sqrt(field.length)
//   let checkArr = []
//   field.forEach((cell, idx) => {
//     if (cell === 1) {
//       let neighbours = getNeighbours(idx, size)
//       checkArr = checkArr.concat(neighbours)
//       checkArr.push(idx)
//     }
//   })
//   checkArr = checkArr.filter(onlyUnique)
//   return checkArr
// }

// function updateCheckArr (arr) {

// }

export function nextGeneration (field, size, checkGen) {
  let liveCount = 0
  let result = false
  const newField = field.map((oldVal, idx) => {
    const n = getNeighbours(idx, size)
    const ln = findLiveNeighbours(field, n)
    let newVal
    if (oldVal === 0 && ln === 3) {
      newVal = 1
      liveCount++
    } else if (oldVal === 1 && (ln === 2 || ln === 3)) {
      newVal = 1
      liveCount++
    } else {
      newVal = 0
    }
    return newVal
  })
  return { arr: newField, live: liveCount, equil: result }
}

export function idxToCoords (idx, size) {
  var x = idx % size
  var y = Math.floor(idx / size)
  return [x, y]
}

export function canvasTileCoords (idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords[0] *= tileSize
  coords[0]++
  coords[1] *= tileSize
  coords[1]++
  return coords
}

export function canvasGridCoords (idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords[0] *= tileSize
  coords[1] *= tileSize
  return coords
}

export function coordsToIdx (coords, size) {
  const y = coords.y * size
  const idx = coords.x + y
  return idx
}

export function getNeighbours (idx, size) {
  let neighbours = []
  let targetCoords = idxToCoords(idx, size)
  for (let i = 0; i < 9; i++) {
    let itx = Math.floor(i / 3) - 1
    let ity = (i % 3) - 1
    let newX = targetCoords[0] + itx
    if (newX < 0) {
      newX = size - 1
    } else if (newX > size - 1) {
      newX = 0
    }
    let newY = targetCoords[1] + ity
    if (newY < 0) {
      newY = size - 1
    } else if (newY > size - 1) {
      newY = 0
    }
    if (i !== 4) {
      neighbours.push(coordsToIdx({ x: newX, y: newY }, size))
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

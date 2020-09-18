const generationTruthTable = {
  0: {
    0: 0,
    1: 0,
    2: 0,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  },
  1: {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  }
}

function getNextGenWithMap (field, size) {
  const newField = field.map((oldVal, idx) => {
    const n = getNeighbours(idx, size)
    const ln = findLiveNeighbours(field, n)
    if (oldVal) {
      n.forEach(n => {
      })
    }
    const newVal = generationTruthTable[oldVal][ln]
    return newVal
  })
  return newField
}

const makeRandomMap = (size) => {
  const tileTotal = size * size
  const field = new Array(tileTotal).fill(0)
  let newField = []
  newField = field.map(tile => {
    let rand = Math.random()
    if (rand > 0.85) {
      tile = 1
    }
    return tile
  })
  return newField
}

function idxToCoords (idx, size) {
  const x = idx % size
  const y = Math.floor(idx / size)
  return { x: x, y: y }
}

function coordsToIdx (coords, size) {
  // console.log(size)
  if (coords.x > (size - 1)) {
    coords.x = 0
  } else if (coords.x < 0) {
    coords.x = size - 1
  }
  if (coords.y > (size - 1)) {
    coords.y = 0
  } else if (coords.y < 0) {
    coords.y = size - 1
  }
  // console.log(coords)
  const y = coords.y * size
  const idx = coords.x + y
  return idx
}

function getNeighbours (idx, size) {
  let neighbours = []
  const crds = idxToCoords(idx, size)
  // console.log(crds)
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y - 1 }, size))
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y }, size))
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y + 1 }, size))
  neighbours.push(coordsToIdx({ x: crds.x, y: crds.y - 1 }, size))
  neighbours.push(coordsToIdx({ x: crds.x, y: crds.y + 1 }, size))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y - 1 }, size))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y }, size))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y + 1 }, size))
  return neighbours
}

function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

module.exports = {
  generationTruthTable,
  makeRandomMap,
  getNextGenWithMap
}

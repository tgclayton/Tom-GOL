const genObj = {
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

export function nextGeneration (field, size, checkGen) {
  let liveCount = 0
  let changedIdx = []
  const newField = field.map((oldVal, idx) => {
    const n = getNeighbours(idx, size)
    const ln = findLiveNeighbours(field, n)
    const newVal = genObj[oldVal][ln]
    // if (oldVal === 0 && ln === 3) {
    //   newVal = 1
    //   liveCount++
    // } else if (oldVal === 1 && (ln === 2 || ln === 3)) {
    //   newVal = 1
    //   liveCount++
    // } else {
    //   newVal = 0
    // }
    if (oldVal !== newVal) {
      changedIdx.push(idx)
    }
    // if cell changes, add index to array
    // return that array
    // if number of livecells doesnt change for three generations, check to see if changing indexes are the same
    // if they are === to 2 generationas ago pause the game
    return newVal
  })
  return { arr: newField, live: liveCount, changed: changedIdx }
}

export function idxToCoords (idx, size) {
  const x = idx % size
  const y = Math.floor(idx / size)
  return { x: x, y: y }
}

export function canvasTileCoords (idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords.x *= tileSize
  coords.x++
  coords.y *= tileSize
  coords.y++
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
  const crds = idxToCoords(idx, size)
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

export function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

const cellTruthTable = {
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
  let liveCount = 0
  let checkSet = new Set()
  newField = field.map((tile, idx) => {
    let rand = Math.random()
    if (rand > 0.9) {
      let neighbours = getNeighbours(idx, size)
      tile = 1
      liveCount++
      neighbours.forEach(n => checkSet.add(n))
      // checkSet = new Set([...checkSet, ...neighbours])
    }
    return tile
  })
  return { map: newField, liveCells: liveCount, checkSet: checkSet }
}

// new next generation function using loop instead of map
export function nextGeneration (map, size, checkSet, field) {
  let liveCount = 0
  let newMap = []
  new Array(size * size).fill(0)
  let changedIdx = []
  // let newCheckSet = new Set()
  let liveCellIdxs = []
  const length = map.length
  for (let i = 0; i < length; i++) {
    const oldVal = map[i]
    const n = field[i].wrappedNeighbours
    const ln = findLiveNeighbours(map, n)
    const newVal = cellTruthTable[oldVal][ln]
    newMap[i] = newVal
    if (oldVal !== newVal) {
      changedIdx.push(i)
    }
    if (newVal === 1) {
      liveCellIdxs.push(i)
      liveCount++
    }
  }
  // for (let idx of checkSet) {
  // console.log(` idx: ${idx}`)
  // console.log(`oldval: ${oldVal}`)
  // console.log(`n: ${n}`)
  // console.log(`ln: ${ln}`)
  // console.log(`newVal: ${newVal}`)
  // console.log(` `)
  // newCheckSet.add(idx)
  // n.forEach(n => checkSet.add(n))
  // newCheckSet = new Set([...newCheckSet, ...n])
  // }
  // console.log(newCheckSet)
  return { arr: newMap, live: liveCount, changed: changedIdx, liveCells: liveCellIdxs }
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

export function getNeighbours (idx, size, knownNeighbours) {
  let neighbours = knownNeighbours ? [...knownNeighbours] : []
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

export function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

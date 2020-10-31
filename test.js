const size = 500000

function createField (size) {
  const field = {}
  for (let i = 0; i < size; i++) {
    field[i] = {
      wrappedNeighbours: getNeighbours(i, size / size)
    }
  }
  return field
}

const field = createField(size)

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


function test1 (length) {
  let neighbours = []
  const start = Date.now()
  for (let i = 0; i < length; i++) {
    neighbours.push(field[i].wrappedNeighbours)
  }
  const end = Date.now()
  console.log('Test: Get neighbours using For loop')
  console.log(`Time taken: ${end - start}ms`)
}

function test2 (length) {
  let neighbours = []
  let i = length
  const start = Date.now()
  while (i--) {
    neighbours.push(field[i].wrappedNeighbours)
  }
  const end = Date.now()
  console.log('Test: Get neighbours using while loop')
  console.log(`Time taken: ${end - start}ms`)
}

function test3 (length) {
  const start = Date.now()
  //
  for (let i = 0; i < length; i++) {
    const ln = Math.floor(Math.random() * (8 - 0 + 1) + 0)
    const val = Math.random() > 0.5 ? 1 : 0
    const newVal = cellTruthTable[val][ln]
  }
  //
  const end = Date.now()
  console.log(`Time taken: ${end - start}ms`)
}

// const array = new Array(500000).fill(0)

function test4 (length) {
  const start = Date.now()
  //
  for (let i = 0; i < length; i++) {
    const ln = Math.floor(Math.random() * (8 - 0 + 1) + 0)
    const val = Math.random() > 0.5 ? 1 : 0
    let newVal
    if ((val === 0 && ln === 3) || (val === 1 && (ln === 3 || ln === 2))) {
      newVal = 1
    } else {
      newVal = 0
    }
  }
  const end = Date.now()
  console.log(`Time taken: ${end - start}ms`)
}

function test5 (length) {
  const start = Date.now()
  //
  const newArr = array.map(cell => {
    const ln = Math.floor(Math.random() * (8 - 0 + 1) + 0)
    const val = Math.random() > 0.5 ? 1 : 0
    let newVal
    if ((val === 0 && ln === 3) || (val === 1 && (ln === 3 || ln === 2))) {
      newVal = 1
      return newVal
    } else {
      newVal = 0
      return newVal
    }
  })
  //
  const end = Date.now()
  console.log(`Time taken: ${end - start}ms`)
}

// test1(size)
test2(size)

//
//
//
//
//
//
//
//
//

const makeRandomMap = (size) => {
  const tileTotal = size * size
  const field = new Array(tileTotal).fill(0)
  let newField = []
  let liveCount = 0
  let checkSet = new Set()
  newField = field.map((tile, idx) => {
    let rand = Math.random()
    if (rand > 0.8) {
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
function nextGeneration (map, size, checkSet, field) {
  let newMap = new Array(size * size).fill(0)
  let liveCount = 0
  let changedIdx = []
  let newCheckSet = new Set()
  let liveCellIdxs = []
  for (let idx of checkSet) {
    const oldVal = map[idx]
    const n = field[idx].wrappedNeighbours
    const ln = findLiveNeighbours(map, n)
    const newVal = cellTruthTable[oldVal][ln]
    // console.log(` idx: ${idx}`)
    // console.log(`oldval: ${oldVal}`)
    // console.log(`n: ${n}`)
    // console.log(`ln: ${ln}`)
    // console.log(`newVal: ${newVal}`)
    // console.log(` `)
    newMap[idx] = newVal
    if (oldVal !== newVal) {
      changedIdx.push(idx)
    }
    if (newVal === 1) {
      liveCellIdxs.push(idx)
      liveCount++
      newCheckSet.add(idx)
      n.forEach(n => checkSet.add(n))
      // newCheckSet = new Set([...newCheckSet, ...n])
    }
  }
  // console.log(newCheckSet)
  return { arr: newMap, live: liveCount, changed: changedIdx, checkSet: newCheckSet, liveCells: liveCellIdxs }
}

function idxToCoords (idx, size) {
  const x = idx % size
  const y = Math.floor(idx / size)
  return { x: x, y: y }
}

function canvasTileCoords (idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords.x *= tileSize
  coords.x++
  coords.y *= tileSize
  coords.y++
  return coords
}

function canvasGridCoords (idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords[0] *= tileSize
  coords[1] *= tileSize
  return coords
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

function getNeighbours (idx, size, knownNeighbours) {
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

function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

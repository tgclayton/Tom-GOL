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
  let liveCount = 0
  let checkSet = new Set()
  newField = field.map((tile, idx) => {
    let rand = Math.random()
    if (rand > 0.9) {
      let neighbours = getNeighbours(idx, size)
      tile = 1
      liveCount++
      checkSet = new Set([...checkSet, ...neighbours])
    }
    return tile
  })
  return { map: newField, liveCells: liveCount, checkSet: checkSet }
}

// export function nextGeneration (field, size, checkGen) {
//   let liveCount = 0
//   let changedIdx = []
//   const newField = field.map((oldVal, idx) => {
//     const n = getNeighbours(idx, size)
//     const ln = findLiveNeighbours(field, n)
//     if (oldVal) {
//       n.forEach(n => {
//         // console.log(idxToCoords(n, size))
//       })
//       // console.log(' ')
//     }
//     const newVal = genObj[oldVal][ln]
//     if (oldVal !== newVal) {
//       changedIdx.push(idx)
//     }
//     if (newVal === 1) {
//       liveCount++
//     }
//     return newVal
//   })
//   return { arr: newField, live: liveCount, changed: changedIdx }
// }

// pre check set version
// export function nextGeneration (field, size) {
//   let newField = []
//   let liveCount = 0
//   let changedIdx = []
//   for (let i = 0; i < field.length; i++) {
//     const oldVal = field[i]
//     const n = getNeighbours(i, size)
//     const ln = findLiveNeighbours(field, n)
//     const newVal = genObj[oldVal][ln]
//     newField.push(newVal)
//     if (oldVal !== newVal) {
//       changedIdx.push(i)
//     }
//     if (newVal === 1) {
//       liveCount++
//     }
//   }
//   return { arr: newField, live: liveCount, changed: changedIdx }
// }

// new next generation function using loop instead of map
export function nextGeneration (field, size, checkSet) {
  let newField = new Array(size * size).fill(0)
  let liveCount = 0
  let changedIdx = []
  let newCheckSet = new Set()
  for (let idx of checkSet) {
    const oldVal = field[idx]
    const n = getNeighbours(idx, size)
    const ln = findLiveNeighbours(field, n)
    const newVal = genObj[oldVal][ln]
    // console.log(` idx: ${idx}`)
    // console.log(`oldval: ${oldVal}`)
    // console.log(`n: ${n}`)
    // console.log(`ln: ${ln}`)
    // console.log(`newVal: ${newVal}`)
    // console.log(` `)
    newField[idx] = newVal
    if (oldVal !== newVal) {
      changedIdx.push(idx)
    }
    if (newVal === 1) {
      liveCount++
      newCheckSet = new Set([...newCheckSet, ...n])
      newCheckSet.add(...n, idx)
    }
  }
  // console.log(newField)
  return { arr: newField, live: liveCount, changed: changedIdx, checkSet: newCheckSet }
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

export function getNeighbours (idx, size) {
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

export function findLiveNeighbours (field, neighbours) {
  let ln = 0
  neighbours.forEach(idx => {
    if (field[idx] === 1) {
      ln++
    }
  })
  return ln
}

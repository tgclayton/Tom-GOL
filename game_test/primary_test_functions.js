import { getNeighbours, findLiveNeighbours, generationTruthTable } from './game.js'

export function getNextGenWithMap (field, size, checkGen) {
  let liveCount = 0
  let changedIdx = []
  const newField = field.map((oldVal, idx) => {
    const n = getNeighbours(idx, size)
    const ln = findLiveNeighbours(field, n)
    if (oldVal) {
      n.forEach(n => {
        // console.log(idxToCoords(n, size))
      })
      // console.log(' ')
    }
    const newVal = generationTruthTable[oldVal][ln]
    if (oldVal !== newVal) {
      changedIdx.push(idx)
    }
    if (newVal === 1) {
      liveCount++
    }
    return newVal
  })
  return { arr: newField, live: liveCount, changed: changedIdx }
}

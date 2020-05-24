export const makeRandomMap = () => {
  const field = new Array(400).fill(0)
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

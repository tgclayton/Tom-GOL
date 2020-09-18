const { makeRandomMap, getNextGenWithMap } = require('./game.js')

function runTest () {
  const start = Date.now()
  let field = makeRandomMap(65)

  for (let i = 1; i < 1000; i++) {
    field = getNextGenWithMap(field, 65)
  }

  const end = Date.now()
  console.log(`Time elapsed:, ${end - start}`)
}

runTest()

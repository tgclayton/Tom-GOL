import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, makeCheckArr } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

var workArr = new Array(4225).fill(0)
var checkArr = []
var generation = 0

class App extends Component {
  constructor () {
    super()
    this.state = {
      mapArr: new Array(4225).fill(0), // still need to make this less hardcoded
      generation: 0,
      gameRunning: false,
      game: null,
      mouseDown: null,
      runSpeed: 150,
      liveCells: 0,
      size: 65,
      grid: true
    }
    this.setMap = this.setMap.bind(this)
    this.runGame = this.runGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.toggleTile = this.toggleTile.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
    this.clearGame = this.clearGame.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
  }
  // componentDidMount () {
  //   this.setState({
  //     mapArr: new Array(this.state.size * this.state.size).fill(0)
  //   })
  // }
  toggleTile = (idx) => {
    let tile = document.getElementById(idx)
    if (this.state.gameRunning === false) {
      tile.classList.toggle('live-cell')
      tile.classList.toggle('dead-cell')
      workArr[idx] === 1 ? workArr[idx] = 0 : workArr[idx] = 1
    }
    let check = makeCheckArr(workArr)
    checkArr = check
  }

  componentDidMount () {

  }

setSpeed = (speed, id) => {
  let wasRunning = this.state.gameRunning
  this.pauseGame()
  this.setState({
    runSpeed: speed
  }, () => {
    if (wasRunning) {
      this.runGame(false)
    }
  })
}

setLiveCells = (field) => {
  let live = field.filter(cell => cell === 1)
  this.setState({
    liveCells: live.length
  })
}

clearGame = () => {
  this.pauseGame()
  let mapArr = new Array(this.state.size * this.state.size).fill(0) // this also needs to be less hardcoded
  generation = 0
  workArr = mapArr
  this.setState({
    generation: 0,
    mapArr: mapArr
  })
}

setMap = () => {
  this.pauseGame()
  let mapArr = makeRandomMap(this.state.size)
  this.setLiveCells(mapArr)
  checkArr = makeCheckArr(mapArr)
  workArr = mapArr
  generation = 0
  this.setState({
    generation: 0,
    mapArr: mapArr,
    checkArr: checkArr
  })
}

pauseGame = () => {
  clearInterval(this.state.game)
  let gen = generation
  let live = workArr.filter(cell => cell === 1)
  this.setState({
    gameRunning: false,
    mapArr: workArr,
    generation: gen,
    liveCells: live.length
  })
}

runGame = (singleGen) => {
  if (!this.state.gameRunning) {
    if (singleGen) {
      this.showNextGen(workArr)
      this.setState({
        mapArr: workArr
      })
    } else {
      this.setState({
        game: setInterval(() => this.showNextGen(workArr), this.state.runSpeed),
        gameRunning: true
      }, () => {})
    }
  }
}

toggleGrid = () => {
  let g
  if (this.state.grid) {
    g = false
  } else {
    g = true
  }
  document.getElementById('grid-display').classList.toggle('hidden')
  this.setState({
    grid: g,
    mapArr: workArr,
    generation: generation
  })
}

//  showNextGen = (field) => { // old version kept in case
//    let nextGen = nextGeneration(field, this.state.checkArr, this.state.size)
//    let generation = this.state.generation
//    generation++
//    this.setState({
//      mapArr: nextGen[0],
//      generation: generation,
//      liveCells: nextGen[1],
//      checkArr: nextGen[2]
//    })
//  }

showNextGen = (field) => {
  let nextGen = nextGeneration(field, checkArr, this.state.size)
  generation++
  workArr = nextGen[0]
  let changeArr = nextGen[3]
  let liveCells = nextGen[1]
  checkArr = nextGen[2]
  document.getElementById('gen').innerHTML = `Generation: ${generation}`
  document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells}`
  changeArr.forEach(idx => {
    const tile = document.getElementById(idx)
    tile.classList.toggle('live-cell')
    tile.classList.toggle('dead-cell')
  })
}

render () {
  return (
    <Router>
      <h1 id = 'main-title'>The Game of Life</h1>
      {/* <Route exact path = '/' component = {() => <Home/>} /> */}
      <Route exact path = '/' component = {() => <GameView
        toggleGrid = {this.toggleGrid}
        grid = {this.state.grid}
        liveCells= {this.state.liveCells}
        running = {this.state.gameRunning}
        setSpeed = {this.setSpeed}
        speed = {this.state.runSpeed}
        clearGame = {this.clearGame}
        toggleTile = {this.toggleTile}
        runGame = {this.runGame}
        pauseGame = {this.pauseGame}
        setMap = {this.setMap}
        mapArr ={this.state.mapArr}
        gen = {this.state.generation}
      />}
      />
      <Route exact path = '/instructions' component = {() => <Instructions/>} />
      <Route exact path = '/load' component = {() => <LoadStart/>} />
    </Router>
  )
}
}

export default App

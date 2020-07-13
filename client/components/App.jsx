import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, coordsToIdx, canvasTileCoords } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

var workArr = new Array(4225).fill(0)
var generation = 0
var grid = true
var gameRun = []

function checkGame () {
  console.log(gameRun)
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      mapArr: new Array(4225).fill(0), // still need to make this less hardcoded
      generation: 0,
      gameRunning: false,
      game: null,
      mouseDown: null,
      runSpeed: 120,
      liveCells: 0,
      size: 65
    }
    this.setMap = this.setMap.bind(this)
    this.runGame = this.runGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.toggleTile = this.toggleTile.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
    this.clearGame = this.clearGame.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
  }

  componentDidMount () {
    this.canvasDraw(workArr)
  }

  componentDidUpdate () {
    this.canvasDraw(workArr)
  }

  canvasDraw (map) {
    const canvas = document.getElementById('game-canvas')
    const tileSize = 10 // change final value to not be hardcoded
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      map.forEach((cell, idx) => {
        const tcrds = canvasTileCoords(idx, this.state.size, tileSize)
        if (cell) {
          ctx.fillStyle = '#008000'
        } else {
          ctx.fillStyle = 'rgb(224, 224, 224)'
        }
        ctx.fillRect(tcrds[0], tcrds[1], tileSize, tileSize)
      })
    }
  }

  toggleTile = (crds) => {
    const idx = coordsToIdx(crds, this.state.size)
    console.log(idx)
    if (this.state.gameRunning === false) {
      workArr[idx] ? workArr[idx] = 0 : workArr[idx] = 1
    }
    this.canvasDraw(workArr)
  }

setSpeed = (speed, id) => {
  var wasRunning = this.state.gameRunning
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
  var live = field.filter(cell => cell === 1)
  this.setState({
    liveCells: live.length
  })
}

clearGame = () => {
  this.pauseGame()
  var mapArr = new Array(this.state.size * this.state.size).fill(0) // this also needs to be less hardcoded
  generation = 0
  workArr = mapArr
  this.setState({
    generation: 0,
    mapArr: mapArr,
    liveCells: 0
  })
}

setMap = () => {
  var mapArr = makeRandomMap(this.state.size)
  this.canvasDraw(mapArr)
  workArr = mapArr
  generation = 0
}

pauseGame = () => {
  clearInterval(this.state.game)
  var gen = generation
  var live = workArr.filter(cell => cell === 1)
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
    } else {
      this.setState({
        mapArr: workArr,
        game: setInterval(() => this.showNextGen(workArr), this.state.runSpeed),
        gameRunning: true
      }, () => {})
    }
  }
}

toggleGrid = () => {
  grid ? grid = false : grid = true
  const canvas = document.getElementById('game-canvas')
  canvas.classList.toggle('canvas-border')
  this.canvasDraw(workArr)
}

showNextGen = (field) => {
  var nextGen = nextGeneration(field, this.state.size)
  generation++
  workArr = nextGen[0]
  gameRun.push(workArr)
  var liveCells = nextGen[1]
  document.getElementById('gen').innerHTML = `Generation: ${generation}`
  document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells}`
  this.canvasDraw(workArr)
}

render () {
  return (
    <Router>
      <h1 id = 'main-title'>The Game of Life</h1>
      {/* <Route exact path = '/' component = {() => <Home/>} /> */}
      <Route exact path = '/' component = {() => <GameView
        toggleGrid = {this.toggleGrid}
        grid = {this.props.grid}
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
      <button onMouseDown = {() => checkGame()}>Check gameRun</button>
      <Route exact path = '/instructions' component = {() => <Instructions/>} />
      <Route exact path = '/load' component = {() => <LoadStart/>} />
    </Router>
  )
}
}

const mapStateToProps = state => {
  return {
    grid: state.map.grid
  }
}

export default connect(mapStateToProps)(App)

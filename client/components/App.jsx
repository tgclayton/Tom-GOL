import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, coordsToIdx, canvasTileCoords } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

let workArr = new Array(4225).fill(0)
let generation = 0
let grid = true
let gameRun = []
let liveCheck = []
let changed = []

function checkGame () {
  console.log(changed)
  console.log(liveCheck)
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
    window.addEventListener('keydown', e => this.handleKey(e))
  }

  componentDidUpdate () {
    this.canvasDraw(workArr)
  }

  handleKey (e) {
    e.preventDefault()
    // console.log(e)
    switch (e.key) {
      case ' ':
        this.state.gameRunning
          ? this.pauseGame()
          : this.runGame()
        break
      case 'ArrowLeft':
      case 'a':
        this.showPrevGen()
        break
      case 'ArrowRight':
      case 'd':
        this.showNextGen(workArr)
        break
      case '1':
        this.setSpeed(600)
        break
      case '2':
        this.setSpeed(300)
        break
      case '3':
        this.setSpeed(120)
        break
      case '4':
        this.setSpeed(30)
        break
      case '5':
        this.setSpeed(1)
        break
    }
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
        ctx.fillRect(tcrds.x, tcrds.y, tileSize, tileSize)
      })
    }
  }

  toggleTile = (crds) => {
    const idx = coordsToIdx(crds, this.state.size)
    if (this.state.gameRunning === false) {
      workArr[idx] ? workArr[idx] = 0 : workArr[idx] = 1
    }
    this.canvasDraw(workArr)
  }

setSpeed = (speed) => {
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
  gameRun = []
  this.setState({
    generation: 0,
    mapArr: mapArr,
    liveCells: 0
  })
}

setMap = () => {
  var mapArr = makeRandomMap(this.state.size)
  this.canvasDraw(mapArr)
  gameRun.push(mapArr)
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
  let checkGen
  gameRun.length > 3 ? checkGen = gameRun[gameRun.length - 2] : checkGen = null
  let nextGen = nextGeneration(field, this.state.size, checkGen)
  generation++
  workArr = nextGen.arr
  gameRun.push(workArr)
  let liveCells = nextGen.live
  if (liveCheck.length < 3) {
    liveCheck.unshift(liveCells)
    changed.unshift(nextGen.changed)
  } else {
    liveCheck.pop(); liveCheck.unshift(liveCells)
    changed.pop(); changed.unshift(nextGen.changed)
  }

  document.getElementById('gen').innerHTML = `Generation: ${generation}`
  document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells}`
  this.canvasDraw(workArr)
  const allEqual = liveCheck.every(v => v === liveCheck[0])
  if (allEqual) {
    const equil = changed[0].every((v, i) => v === changed[1][i])
    if (equil) {
      this.pauseGame()
    }
  }
}

showPrevGen () {
  if (generation >= 1) {
    const prevGen = gameRun[gameRun.length - 2] || gameRun[0]
    workArr = prevGen
    generation--
    gameRun.pop()
    const liveCells = prevGen.filter(val => val === 1)
    document.getElementById('gen').innerHTML = `Generation: ${generation}`
    document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells.length}`
    this.canvasDraw(prevGen)
  }
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

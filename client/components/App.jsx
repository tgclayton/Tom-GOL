import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, makeCheckArr } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

class App extends Component {
  constructor () {
    super()
    this.state = {
      mapArr: new Array(4225).fill(0),
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
    this.stopGame = this.stopGame.bind(this)
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
    let mapArr = this.state.mapArr
    let tile = document.getElementById(idx)
    if (this.state.gameRunning === false) {
      tile.classList.toggle('live-cell')
      tile.classList.toggle('dead-cell')
      if (mapArr[idx] === 1) {
        mapArr[idx] = 0
      } else {
        mapArr[idx] = 1
      }
      let checkArr = makeCheckArr(mapArr)
      this.setState({
        mapArr,
        checkArr
      })
    }
  }

setSpeed = (speed, id) => {
  let wasRunning
  if (this.state.gameRunning) {
    wasRunning = true
  }
  this.stopGame()
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
  this.stopGame()
  let mapArr = new Array(this.state.size * this.state.size).fill(0) // this also needs to be less hardcoded
  this.setState({
    generation: 0,
    mapArr: mapArr
  })
}

setMap = () => {
  this.stopGame()
  let mapArr = makeRandomMap(this.state.size)
  this.setLiveCells(mapArr)
  let checkArr = makeCheckArr(mapArr)
  this.setState({
    generation: 0,
    mapArr: mapArr,
    checkArr: checkArr
  })
}

stopGame = () => {
  clearInterval(this.state.game)
  this.setState({
    gameRunning: false
  })
}

runGame = (singleGen) => {
  if (!this.state.running) {
    if (singleGen) {
      this.showNextGen(this.state.mapArr)
    } else {
      this.setState({
        game: setInterval(() => this.showNextGen(this.state.mapArr), this.state.runSpeed),
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
  this.setState({
    grid: g
  })
}

 showNextGen = (field) => {
   //  console.log(this.state.checkArr)
   let nextGen = nextGeneration(field, this.state.checkArr, this.state.size)
   let generation = this.state.generation
   generation++
   this.setState({
     mapArr: nextGen[0],
     generation: generation,
     liveCells: nextGen[1],
     checkArr: nextGen[2]
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
         stopGame = {this.stopGame}
         setMap = {this.setMap}
         mapArr ={this.state.mapArr}
         gen = {this.state.generation}/>} />
       <Route exact path = '/instructions' component = {() => <Instructions/>} />
       <Route exact path = '/load' component = {() => <LoadStart/>} />
     </Router>
   )
 }
}

export default App

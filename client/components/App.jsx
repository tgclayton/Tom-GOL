import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, makeCheckArr, idxToCoords, coordsToIdx } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

class App extends Component {
  constructor () {
    super()
    this.state = {
      mapArr: new Array(1600).fill(0), // change this to be less hardcoded
      generation: 0,
      gameRunning: false,
      game: null,
      mouseDown: null,
      runSpeed: 150,
      liveCells: 0
    }
    this.setMap = this.setMap.bind(this)
    this.runGame = this.runGame.bind(this)
    this.stopGame = this.stopGame.bind(this)
    this.toggleTile = this.toggleTile.bind(this)
    this.clearGame = this.clearGame.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
  }

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
      this.setState({
        mapArr
      }, () => {
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
  let mapArr = new Array(1600).fill(0)
  this.setState({
    generation: 0,
    mapArr: mapArr
  })
}

setMap = () => {
  this.stopGame()
  let mapArr = makeRandomMap()
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
  setTimeout(() => {}, 50)
}

runGame = (singleGen) => {
  if (singleGen) {
    if (this.state.gameRunning) {
      this.showNextGen(this.state.mapArr)
    }
  } else if (!this.state.gameRunning) {
    this.setState({
      game: setInterval(() => this.showNextGen(this.state.mapArr), this.state.runSpeed),
      gameRunning: true
    }, () => {})
  }
}

idxtocoordstest = () => {
  let target = document.getElementById('idtest').value
  console.log(idxToCoords(target))
}

coordstoidxtest = () => {
  let targetx = Number(document.getElementById('coordtestx').value)
  let targety = Number(document.getElementById('coordtesty').value)
  console.log(coordsToIdx([targetx, targety]))
}

 showNextGen = (field) => {
   let nextGen = nextGeneration(field, this.state.checkArr)
   field = nextGen[0]
   let generation = this.state.generation
   generation++
   this.setState({
     mapArr: field,
     generation: generation,
     liveCells: nextGen[1]
   }, () => {})
 }

 render () {
   return (
     <Router>
       <h1 id = 'main-title'>The Game of Life</h1>
       <button onClick= {this.idxtocoordstest}>id test</button>
       <button onClick= {this.coordstoidxtest}>coord test</button>
       <input type="text" name="" id="idtest"/>
       <input type="text" name="" id="coordtestx"/>
       <input type="text" name="" id="coordtesty"/>
       {/* <Route exact path = '/' component = {() => <Home/>} /> */}
       <Route exact path = '/' component = {() => <GameView
         liveCells= {this.state.liveCells}
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

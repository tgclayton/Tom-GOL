import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration, makeRandomMap, makeCheckArr } from './functions'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'
import { run } from 'jest'
class App extends Component {
  constructor () {
    super()
    this.state = {
      mapArr: new Array(1600).fill(0), // change this to be less hardcoded
      generation: 0,
      gameRunning: false,
      game: null,
      mouseDown: null,
      runSpeed: 150
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

clearGame = () => {
  let mapArr = new Array(1600).fill(0)
  this.setState({
    generation: 0,
    mapArr: mapArr
  })
}

setMap = () => {
  let mapArr = makeRandomMap()
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
    this.showNextGen(this.state.mapArr)
  } else if (!this.state.gameRunning) {
    this.setState({
      game: setInterval(() => this.showNextGen(this.state.mapArr), this.state.runSpeed),
      gameRunning: true
    }, () => {})
  }
}

 showNextGen = (field) => {
   field = nextGeneration(field, this.state.checkArr)
   let generation = this.state.generation
   generation++
   this.setState({
     mapArr: field,
     generation: generation
   }, () => {})
 }

 render () {
   return (
     <Router>
       <h1 id = 'main-title'>The Game of Life</h1>
       {/* <Route exact path = '/' component = {() => <Home/>} /> */}
       <Route exact path = '/' component = {() => <GameView
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

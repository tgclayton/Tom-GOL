import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { nextGeneration } from './functions'
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
      running: false,
      game: null
    }
    this.setMap = this.setMap.bind(this)
    this.runGame = this.runGame.bind(this)
    this.stopGame = this.stopGame.bind(this)
    this.toggleTile = this.toggleTile.bind(this)
  }

  toggleTile = (idx) => {
    let mapArr = this.state.mapArr
    if (mapArr[idx] === 1) {
      mapArr[idx] = 0
    } else {
      mapArr[idx] = 1
    }

    this.setState({
      mapArr
    })
  }

setMap = (mapArr) => {
  this.setState({
    generation: 0,
    mapArr: mapArr
  })
}

stopGame = () => {
  clearInterval(this.state.game)
}

runGame = () => {
  this.showNextGen(this.state.mapArr)
  // if (this.state.running) {
  //   clearInterval(this.state.game)
  //   this.setState({
  //     running: false
  //   })
  // } else {
  //   this.setState({
  //     game: setInterval(() => this.showNextGen(this.state.mapArr), 100),
  //     running: true
  //   })
  // }
}

 showNextGen = (field) => {
   field = nextGeneration(field)
   let generation = this.state.generation
   generation++
   this.setState({
     mapArr: field,
     generation: generation
   })
 }

 render () {
   return (
     <Router>
       <h1 id = 'main-title'>The Game of Life</h1>
       <Route exact path = '/' component = {() => <Home/>} />
       <Route exact path = '/game' component = {() => <GameView
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

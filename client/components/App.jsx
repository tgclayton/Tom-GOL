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
  }

setMap = (mapArr) => {
  this.setState({
    mapArr: mapArr
  })
}

runGame = () => {
  if (this.state.running) {
    clearInterval(this.state.game)
    this.setState({
      running: false
    })
  } else {
    this.setState({
      game: setInterval(() => this.showNextGen(this.state.mapArr), 50),
      running: true
    })
  }
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
         runGame = {this.runGame}
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

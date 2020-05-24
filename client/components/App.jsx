import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import LoadStart from './LoadStart'

class App extends Component {
  render () {
    return (
      <Router>
        <h1 id = 'main-title'>The Game of Life</h1>
        <Route exact path = '/' component = {() => <Home/>} />
        <Route exact path = '/game' component = {() => <GameView/>} />
        <Route exact path = '/instructions' component = {() => <Instructions/>} />
        <Route exact path = '/load' component = {() => <LoadStart/>} />
      </Router>
    )
  }
}

export default App

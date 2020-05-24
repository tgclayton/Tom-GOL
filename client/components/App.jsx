import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'

class App extends Component {
  render () {
    return (
      <Router>
        <h1 id = 'main-title'>The Game of Life</h1>
        <Route exact path = '/' component = {() => <Home/>} />
      </Router>
    )
  }
}

export default App

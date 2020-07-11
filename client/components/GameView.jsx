import React, { Component } from 'react'
import Tile from './Tile'
import { setMapArr, toggleGrid } from './functions'
import GameCanvas from './GameCanvas'

// function toggleGrid() {

// }

class GameView extends Component {
  constructor () {
    super()
    this.state = {
      grid: true
    }
    this.setFunctionsMapArr = this.setFunctionsMapArr.bind(this)
  }

setFunctionsMapArr =() => {
  const mapArr = this.state.mapArr
  setMapArr(mapArr)
}

toggleGrid = () => {
  this.props.dispatch(toggleGrid())
}

render () {
  let vsClass = null
  let sClass = null
  let nClass = null
  let fClass = null
  const verySlow = 600
  const slow = 300
  const normal = 120
  const fast = 25
  switch (this.props.speed) {
    case verySlow:
      vsClass = 'pressed-button'
      break
    case slow:
      sClass = 'pressed-button'
      break
    case normal:
      nClass = 'pressed-button'
      break
    case fast:
      fClass = 'pressed-button'
      break
  }
  return (
  <>
    <div className = 'flex-container' >
      <div id = 'control-panel' className = 'flex-column side-column'>
        <button onMouseDown = {this.props.setMap}>Create Random Map</button>
        <button onMouseDown = {() => this.props.runGame(false)}>Run Game</button>
        <button onMouseDown = {() => this.props.pauseGame()}>Pause Game</button>
        <button onMouseDown = {() => this.props.runGame(true)}>Run One Generation</button>
        <button onMouseDown = {() => this.props.clearGame()}>Clear Game</button>
        <button onMouseDown = {() => this.props.toggleGrid()}>Toggle Grid</button>
        <div id= 'speed-control'>
          <button id = 'very-slow' className = {`speed-button ${vsClass}`} onMouseDown = {() => this.props.setSpeed(verySlow, 'very-slow')}>Very Slow</button>
          <button id = 'slow' className = {`speed-button ${sClass}`} onMouseDown = {() => this.props.setSpeed(slow, 'slow')}>Slow</button>
          <button id = 'normal' className = {`speed-button ${nClass}`} onMouseDown = {() => this.props.setSpeed(normal, 'normal')}>Normal</button>
          <button id = 'fast' className = {`speed-button ${fClass}`} onMouseDown = {() => this.props.setSpeed(fast, 'fast')}>Fast</button>
        </div>
        <div className = 'right-float'>
          <p id = 'gen'> Generation: {this.props.gen}</p>
          <p id = 'live-cells'>Living Cells: {this.props.liveCells}</p>
        </div>
      </div>
      <div className = 'center-column center'>
        <GameCanvas/>
      </div>
      <div className= 'side-column'></div>
    </div>
  </>
  )
}
}

export default GameView

/* <input type="range" defaultValue = {this.props.speed} min = '50' max = '1000'onMouseDown = {this.props.pauseGame} onMouseUp = {this.props.setSpeed} />
<p>Current Speed: {this.props.speed}</p> */

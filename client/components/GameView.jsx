import React, { Component } from 'react'
import Tile from './Tile'
import { setMapArr } from './functions'

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

render () {
  let vsClass = null
  let sClass = null
  let nClass = null
  let fClass = null
  switch (this.props.speed) {
    case 600:
      vsClass = 'pressed-button'
      break
    case 300:
      sClass = 'pressed-button'
      break
    case 150:
      nClass = 'pressed-button'
      break
    case 15:
      fClass = 'pressed-button'
      break
  }
  return (
    <div className = 'centerer'>
      <div id = 'control-panel' className = 'left-float'>
        <button onMouseDown = {this.props.setMap}>Create Random Map</button>
        <button onMouseDown = {() => this.props.runGame(false)}>Run Game</button>
        <button onMouseDown = {() => this.props.pauseGame()}>Pause Game</button>
        <button onMouseDown = {() => this.props.runGame(true)}>Run One Generation</button>
        <button onMouseDown = {() => this.props.clearGame()}>Clear Game</button>
        <button onMouseDown = {() => this.props.toggleGrid()}>Toggle Grid</button>
        <div id= 'speed-control'>
          <button id = 'very-slow' className = {`speed-button ${vsClass}`} onMouseDown = {() => this.props.setSpeed(600, 'very-slow')}>Very Slow</button>
          <button id = 'slow' className = {`speed-button ${sClass}`} onMouseDown = {() => this.props.setSpeed(300, 'slow')}>Slow</button>
          <button id = 'normal' className = {`speed-button ${nClass}`} onMouseDown = {() => this.props.setSpeed(150, 'normal')}>Normal</button>
          <button id = 'fast' className = {`speed-button ${fClass}`} onMouseDown = {() => this.props.setSpeed(15, 'fast')}>Fast</button>
        </div>
        <div className = 'right-float'>
          <p id = 'gen'> Generation: {this.props.gen}</p>
          <p id = 'live-cells'>Living Cells: {this.props.liveCells}</p>
        </div>
      </div>
      <div id='tile-container' className = ''>
        {this.props.mapArr.map((tile, idx) => {
          return (
            <Tile key = {idx} value = {tile} idx = {idx} toggleTile = {this.props.toggleTile} grid = {this.props.grid}/>
          )
        })}
      </div>
    </div>
  )
}
}

export default GameView

/* <input type="range" defaultValue = {this.props.speed} min = '50' max = '1000'onMouseDown = {this.props.pauseGame} onMouseUp = {this.props.setSpeed} />
<p>Current Speed: {this.props.speed}</p> */

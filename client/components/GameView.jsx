import React, { Component } from 'react'
import Tile from './Tile'

class GameView extends Component {
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
      case 80:
        fClass = 'pressed-button'
        break
    }
    return (
      <div className = 'centerer'>
        <div id='tile-container' className = ''>
          {this.props.mapArr.map((tile, idx) => {
            return (
              <Tile key = {idx} value = {tile} idx = {idx} toggleTile = {this.props.toggleTile}/>
            )
          })}
        </div>
        <p>Generation: {this.props.gen}</p>
        <button onClick = {this.props.setMap}>Create Random Map</button>
        <button onClick = {() => this.props.runGame(false)}>Run Game</button>
        <button onMouseDown = {() => this.props.stopGame(this.props.mapArr)}>Pause Game</button>
        <button onClick = {() => this.props.runGame(true)}>Run One Generation</button>
        <button onClick = {() => this.props.clearGame()}>Clear Game</button>
        <div id= 'speed-control'>
          <button id = 'very-slow' className = {`speed-button ${vsClass}`} onMouseDown = {() => this.props.setSpeed(600, 'very-slow')}>Very Slow</button>
          <button id = 'slow' className = {`speed-button ${sClass}`} onMouseDown = {() => this.props.setSpeed(300, 'slow')}>Slow</button>
          <button id = 'normal' className = {`speed-button ${nClass}`} onMouseDown = {() => this.props.setSpeed(150, 'normal')}>Normal</button>
          <button id = 'fast' className = {`speed-button ${fClass}`} onMouseDown = {() => this.props.setSpeed(80, 'fast')}>Fast</button>
          {/* <p>Current Speed: {speedLabel}</p> */}
        </div>

      </div>
    )
  }
}

export default GameView

/* <input type="range" defaultValue = {this.props.speed} min = '50' max = '1000'onMouseDown = {this.props.stopGame} onMouseUp = {this.props.setSpeed} />
<p>Current Speed: {this.props.speed}</p> */

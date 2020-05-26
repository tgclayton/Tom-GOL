import React, { Component } from 'react'
import Tile from './Tile'

class GameView extends Component {
  render () {
    let speedLabel
    switch (this.props.speed) {
      case 600:
        speedLabel = 'Very Slow'
        break
      case 300:
        speedLabel = 'Slow'
        break
      case 150:
        speedLabel = 'Normal'
        break
      case 80:
        speedLabel = 'Fast'
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
        <div className = 'speed-button' onMouseDown = {() => this.props.setSpeed(600)}>Very Slow</div>
          <div className = 'speed-button' onMouseDown = {() => this.props.setSpeed(300)}>Slow</div>
          <div className = 'speed-button' onMouseDown = {() => this.props.setSpeed(150)}>Normal</div>
          <div className = 'speed-button' onMouseDown = {() => this.props.setSpeed(80)}>Fast</div>
          <p>Current Speed: {speedLabel}</p>
        </div>

      </div>
    )
  }
}

export default GameView

/* <input type="range" defaultValue = {this.props.speed} min = '50' max = '1000'onMouseDown = {this.props.stopGame} onMouseUp = {this.props.setSpeed} />
<p>Current Speed: {this.props.speed}</p> */

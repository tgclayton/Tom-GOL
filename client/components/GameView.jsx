import React, { Component } from 'react'
import Tile from './Tile'

class GameView extends Component {
  render () {
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
        <button onClick = {() => this.props.stopGame(this.props.mapArr)}>Stop Game</button>
        <button onClick = {() => this.props.runGame(true)}>Run One Generation</button>
        <button onClick = {() => this.props.clearGame()}>Clear Game</button>
      </div>
    )
  }
}

export default GameView

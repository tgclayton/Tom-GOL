import React, { Component } from 'react'
import Tile from './Tile'
import { makeRandomMap } from './functions'

class GameView extends Component {

  render () {
    return (
      <div className = 'centerer'>
        <div id='tile-container' className = ''>
          {this.props.mapArr.map((tile, idx) => {
            return (
              <Tile key = {idx} value = {tile}/>
            )
          })}
        </div>
        <p>Generation: {this.props.gen}</p>
        <button onClick = {() => this.props.setMap(makeRandomMap())}>Create Random Map</button>
        <button onClick = {() => this.props.runGame(this.props.mapArr)}>Run Game</button>
        <button onClick = {() => this.props.stopGame(this.props.mapArr)}>Stop Game</button>
      </div>
    )
  }
}

export default GameView

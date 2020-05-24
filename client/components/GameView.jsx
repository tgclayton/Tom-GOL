import React from 'react'
import Tile from './Tile'
import { makeRandomMap } from './functions'

const GameView = (props) => {
  return (
    <div className = 'centerer'>
      <div id='tile-container' className = ''>
        {props.mapArr.map((tile, idx) => {
          return (
            <Tile key = {idx} value = {tile}/>
          )
        })}
      </div>
      <p>Generation: {props.gen}</p>
      <button onClick = {() => props.setMap(makeRandomMap())}>Create Random Map</button>
      <button onClick = {() => props.runGame(props.mapArr)}>Run Game</button>
      <button onClick = {() => props.stopGame(props.mapArr)}>Stop Game</button>
    </div>
  )
}

export default GameView

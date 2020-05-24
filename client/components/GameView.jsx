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
      <button onClick = {() => props.setMap(makeRandomMap())}>Create Random Map</button>
    </div>
  )
}

export default GameView

import React from 'react'
import Tile from './Tile'
import { makeRandomMap } from './functions'

const GameView = (props) => {
  return (
    <>
    <div id='tile-container' className = ''>
      {props.mapArr.map(tile => {
        return (
          <Tile key = {tile.id} alive = {tile.alive}/>
        )
      })}
    </div>
    <button onClick = {makeRandomMap}>Create Random Map</button>
    </>
  )
}

export default GameView

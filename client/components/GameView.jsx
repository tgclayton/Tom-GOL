import React from 'react'
import Tile from './Tile'

const GameView = (props) => {
  return (
    <div id='tile-container' className = ''>
      {props.mapArr.map(tile => {
        return (
          <Tile key = {tile.id} alive = {tile.alive}/>
        )
      })}
    </div>
  )
}

export default GameView

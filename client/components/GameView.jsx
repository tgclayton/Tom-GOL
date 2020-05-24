import React from 'react'
import Tile from './Tile'

const makeRandomMap = () => {
  const field = new Array(400).fill(0)
  let newField = []
  newField = field.map(tile => {
    let rand = Math.random()
    if (rand > 0.6) {
      tile = 1
    }
    return tile
  })
  return newField
}

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

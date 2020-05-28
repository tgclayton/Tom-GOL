import React from 'react'

const Tile = (props) => {
  let type
  if (props.value) {
    type = 'live-cell'
  } else {
    type = 'dead-cell'
  }

  let grid = ''
  if (props.grid === true) {
    grid = 'tile-border'
  }

  return (
    <div id = {props.idx} onMouseDown = {() => props.toggleTile(props.idx)} className = {`tile ${type} ${grid}`}></div>
  )
}

export default Tile

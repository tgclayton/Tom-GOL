import React from 'react'

const Tile = (props) => {
  let type
  if (props.value === 1) {
    type = 'live-cell'
  } else if (props.value === 0) {
    type = 'dead-cell'
  }

  let grid = ''
  if (props.grid === true) {
    grid = 'tile-border'
    type = 'transparent'
  }

  return (
    <div id = {props.type + props.idx} onMouseDown = {() => props.toggleTile(props.idx)} className = {`tile ${type} ${grid}`}></div>
  )
}

export default Tile

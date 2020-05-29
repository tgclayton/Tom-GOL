import React from 'react'

const Tile = (props) => {
  const id = props.key
  let type
  if (props.value) {
    type = 'live-cell'
  } else {
    type = 'dead-cell'
  }

  let grid = ''
  if (props.grid === true) {
    grid = 'tile-border'
    type = 'transparent'
  }

  return (
    <div id = {props.type + idx} onMouseDown = {() => props.toggleTile(props.idx)} className = {`tile ${type} ${grid}`}></div>
  )
}

export default Tile

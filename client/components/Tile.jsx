import React from 'react'

const Tile = (props) => {
  let type
  if (props.value) {
    type = 'live-cell'
  } else {
    type = 'dead-cell'
  }
  return (
    <div onClick = {() => props.toggleTile(props.idx)} className = {`tile ${type}`}></div>
  )
}

export default Tile

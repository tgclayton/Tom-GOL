import React from 'react'

function handleCanvasClick (e) {
  console.log(e.clientX)
  console.log(e.clientY)
}

const GameCanvas = () => {
  return (
    <canvas id = "game-canvas" height = "650" width = "650" className = "" onClick = {(e) => handleCanvasClick(e)}></canvas>
  )
}

export default GameCanvas

import React from 'react'

function relMouseCoords (event, canvas) {
  let totalOffsetX = 0
  let totalOffsetY = 0
  let canvasX = 0
  let canvasY = 0

  do {
    totalOffsetX += canvas.offsetLeft - canvas.scrollLeft
    totalOffsetY += canvas.offsetTop - canvas.scrollTop
  }
  while (canvas === canvas.offsetParent)

  canvasX = event.pageX - totalOffsetX
  canvasY = event.pageY - totalOffsetY

  return { x: Math.floor(canvasX / 10), y: Math.floor(canvasY / 10) }
}

const GameCanvas = (props) => {
  function handleCanvasClick (e) {
    const canvas = document.getElementById('game-canvas')
    const crds = relMouseCoords(e, canvas)
    props.toggleTile(crds)
  }

  return (
    <canvas id = "game-canvas" height = "650" width = "650" className = "" onClick = {(e) => handleCanvasClick(e)}></canvas>
  )
}

export default GameCanvas

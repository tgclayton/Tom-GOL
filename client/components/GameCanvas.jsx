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

  return { x: canvasX, y: canvasY }
}

function handleCanvasClick (e) {
  const canvas = document.getElementById('game-canvas')
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  // const context = canvas.getContex('2d')

  console.log('y:', y)
  // console.log('')
}

const GameCanvas = () => {
  return (
    <canvas id = "game-canvas" height = "650" width = "650" className = "" onClick = {(e) => relMouseCoords(e)}></canvas>
  )
}

export default GameCanvas

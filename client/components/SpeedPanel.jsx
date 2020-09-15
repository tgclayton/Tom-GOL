import React from 'react'

export default function SpeedPanel (props) {
  let vsClass = null
  let sClass = null
  let nClass = null
  let fClass = null
  let ftClass = null
  const verySlow = 600
  const slow = 300
  const normal = 120
  const fast = 30
  const fastest = 1
  switch (props.speed) {
    case verySlow:
      vsClass = 'pressed-button'
      break
    case slow:
      sClass = 'pressed-button'
      break
    case normal:
      nClass = 'pressed-button'
      break
    case fast:
      fClass = 'pressed-button'
      break
    case fastest:
      ftClass = 'pressed-button'
      break
  }

  return (
    <div id='speed-control'>
      <button id='very-slow' className={`speed-button ${vsClass}`} onMouseDown={() => props.setSpeed(verySlow, 'very-slow')}>Very Slow</button>
      <button id='slow' className={`speed-button ${sClass}`} onMouseDown={() => props.setSpeed(slow, 'slow')}>Slow</button>
      <button id='normal' className={`speed-button ${nClass}`} onMouseDown={() => props.setSpeed(normal, 'normal')}>Normal</button>
      <button id='fast' className={`speed-button ${fClass}`} onMouseDown={() => props.setSpeed(fast, 'fast')}>Fast</button>
      <button id='fastest' className={`speed-button ${ftClass}`} onMouseDown={() => props.setSpeed(fastest, 'fastest')}>Fastest</button>
    </div>
  )
}

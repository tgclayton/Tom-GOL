import React from 'react'

export default function SaveBox (props) {
  return (
    <div id = {`save-${props.id}`} className = '' onClick = {props.loadSave}>
      <p>{props.name}</p>
      <p>{props.description}</p>
    </div>
  )
}

import React from 'react'

export default function SaveBox (props) {
  return (
    <div id = {`save-${props.id}`} className = 'save-box' >
      <p>Name: {props.name}</p>
      <p>Description: {props.description}</p>
      <button onClick = {() => props.loadSave(props.data)}>Load Save</button>
      <button onClick = {() => props.deleteSave(props.id)}>Delete Save</button>
    </div>

  )
}

import React from 'react'

export default function SaveBox (props) {
  function respond () {
    alert("This does nothing right now I'm sorry alright?")
  }
  return (
    <div id = {`save-${props.id}`} className = 'save-box' >
      <p>Name: {props.name}</p>
      <p>Description: {props.description}</p>
      <button onClick = {() => props.loadSave(props.data)}>Load Save</button>
      <button onClick = {() => respond()}>Delete Save</button>
    </div>

  )
}

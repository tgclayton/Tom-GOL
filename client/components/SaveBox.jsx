import React from 'react'

export default function SaveBox (props) {
  const { id, data, deleteSave, loadSave, name, description } = props
  return (
    <div id = {`save-${id}`} className = 'save-box' >
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <button onClick = {() => loadSave(data)}>Load Save</button>
      <button onClick = {() => deleteSave(id)}>Delete Save</button>
    </div>

  )
}

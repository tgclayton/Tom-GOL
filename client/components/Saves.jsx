import React from 'react'
import SaveBox from './SaveBox'

export default function Saves (props) {
  return (
    <div>
      <p>Saves:</p>
      {props.saves.map(save => {
        return <SaveBox key = {`save-${save.id}`}
          deleteSave = {props.deleteSave}
          loadSave = {props.loadSave}
          name = {save.name}
          description = {save.description}
          id = {save.id}
          data = {save.fieldData}>
        </SaveBox>
      })}

    </div>
  )
}

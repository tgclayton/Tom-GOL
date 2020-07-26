import React, { Component } from 'react'
// import { setMapArr } from './functions'
import GameCanvas from './GameCanvas'
import Saves from './Saves'

class GameView extends Component {
  constructor () {
    super()
    this.state = {
      grid: true,
      saveName: null,
      saveDesc: null
    }
  }

  nameHandler (e) {
    this.setState({
      saveName: e.target.value
    })
  }

  descHandler (e) {
    this.setState({
      saveDesc: e.target.value
    })
  }

  render () {
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
    switch (this.props.speed) {
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
  <>
    <div className = 'flex-container' >
      <div id = 'control-panel' className = 'flex-column side-column'>
        <button onMouseDown = {this.props.setMap}>Create Random Map</button>
        <button onMouseDown = {() => this.props.runGame(false)}>Run Game</button>
        <button onMouseDown = {() => this.props.pauseGame()}>Pause Game</button>
        <button onMouseDown = {() => this.props.runGame(true)}>Run One Generation</button>
        <button onMouseDown = {() => this.props.clearGame()}>Clear Game</button>
        <button onMouseDown = {() => this.props.toggleGrid()}>Toggle Grid</button>
        <button onMouseDown = {() => this.props.save()}>Save Current Map</button>
        <div id= 'speed-control'>
          <button id = 'very-slow' className = {`speed-button ${vsClass}`} onMouseDown = {() => this.props.setSpeed(verySlow, 'very-slow')}>Very Slow</button>
          <button id = 'slow' className = {`speed-button ${sClass}`} onMouseDown = {() => this.props.setSpeed(slow, 'slow')}>Slow</button>
          <button id = 'normal' className = {`speed-button ${nClass}`} onMouseDown = {() => this.props.setSpeed(normal, 'normal')}>Normal</button>
          <button id = 'fast' className = {`speed-button ${fClass}`} onMouseDown = {() => this.props.setSpeed(fast, 'fast')}>Fast</button>
          <button id = 'fastest' className = {`speed-button ${ftClass}`} onMouseDown = {() => this.props.setSpeed(fastest, 'fastest')}>Fastest</button>
        </div>
        <div className = 'right-float'>
          <p id = 'gen'> Generation: {this.props.gen}</p>
          <p id = 'live-cells'>Living Cells: {this.props.liveCells}</p>
        </div>
        <button id = 'save-button' onClick = {() => this.props.saveWindow()}>Save Map</button>
        <div id = 'save-game-window' className = 'hidden'>Save this map
          <br/>
          <p>Name:</p> <input type="text" name="" id="save-name" onChange = {e => this.nameHandler(e)}/>
          <br/>
          <p >Description:</p> <input type="text" name="" id="save-description" onChange = {e => this.descHandler(e)}/>
          <button onClick = {() => this.props.saveField(this.state.saveName, this.state.saveDesc)}>Save</button>
        </div>
      </div>
      <div className = 'center-column center'>
        <GameCanvas toggleTile = {this.props.toggleTile}/>
      </div>
      <div className= 'side-column'>
        <Saves saves = {this.props.saves}
          loadSave = {this.props.loadSave}
          deleteSave = {this.props.deleteSave}
        ></Saves>
      </div>
    </div>
  </>
    )
  }
}

export default GameView

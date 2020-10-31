import React, { Component } from 'react'
// import { setMapArr } from './functions'
import GameCanvas from './GameCanvas'
import Saves from './Saves'
import SpeedPanel from './SpeedPanel'

class GameView extends Component {
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
    const saving = !this.props.saving ? 'hidden' : ''

    return (
      <>
        <div className='page flex-container' >
          <div id='control-panel' className='flex-column side-column'>
            <button onMouseDown={() => this.props.setMap()}>Create Random Map</button>
            <button onMouseDown={() => this.props.runGame(false)}>Run Game</button>
            <button onMouseDown={() => this.props.pauseGame()}>Pause Game</button>
            <button onMouseDown={() => this.props.runGame(true)}>Run One Generation</button>
            <button onMouseDown={() => this.props.clearGame()}>Clear Game</button>
            <button onMouseDown={() => this.props.toggleGrid()}>Toggle Grid</button>
            <button onMouseDown={() => this.props.save()}>Save Current Map</button>
            <button onMouseDown={() => this.props.speedTest()}>Speed Test</button>

            <div className='right-float'>
              <p id='gen'>Current Generation: {this.props.gen}</p>
              <p id='gen-reached'>Generation Reached: {this.props.genReached}</p>
              <p id='live-cells'>Living Cells: {this.props.liveCells}</p>
              <button onClick={() => this.props.setGen()}>Jump to Generation:</button><input type="number" min={0} max={this.props.gen} name="set-gen" id="set-gen" />
            </div>
            <button id='save-button' onClick={() => this.props.saveWindow()}>Save Map</button>
            <div id='save-game-window' className={`${saving}`} >Save this map
              <br />
              <p>Name:</p> <input type="text" name="" id="save-name" onChange={e => this.nameHandler(e)} />
              <button onClick={() => this.props.saveWindow()}>Cancel</button>
              <br />
              <p >Description:</p> <input type="text" name="" id="save-description" onChange={e => this.descHandler(e)} />
              <button onClick={() => this.props.saveField(this.state.saveName, this.state.saveDesc)}>Save</button>
            </div>
          </div>

          <div className='center-column center'>
            <div>
              <GameCanvas toggleTile={this.props.toggleTile} />
            </div>
            <div>
              <SpeedPanel speed={this.props.speed} setSpeed={this.props.setSpeed}/>
            </div>
          </div>

          <div className='side-column'>
            <Saves saves={this.props.saves}
              loadSave={this.props.loadSave}
              deleteSave={this.props.deleteSave}
            ></Saves>
          </div>
        </div>
      </>
    )
  }
}

export default GameView

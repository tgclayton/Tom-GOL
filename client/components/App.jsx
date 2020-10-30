import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { nextGeneration, makeRandomMap, coordsToIdx, canvasTileCoords, getNeighbours } from './functions'
// import Home from './Home'
import GameView from './GameView'
import Instructions from './Instructions'
import Home from './Home'
import { getSaves, saveField, delSave } from '../api'

let workArr = null
let generation = 0
let gameRun = []
let liveCheck = []
let changed = []
let saving = false
let checkSet = null

function createField (size) {
  const field = {}
  const tileSize = 3
  for (let i = 0; i < size * size; i++) {
    field[i] = {
      wrappedNeighbours: getNeighbours(i, size),
      canvasTileCrds: canvasTileCoords(i, size, tileSize)
    }
  }
  return field
}

function getCanvasContext () {

}

class App extends Component {
  constructor () {
    super()
    const size = 200
    this.state = {
      mapArr: new Array(size * size).fill(0),
      generation: 0,
      gameRunning: false,
      game: null,
      mouseDown: null,
      runSpeed: 120,
      liveCells: 0,
      size: size,
      genReached: 0,
      saves: [],
      saving: false,
      field: createField(size),
      canvasContext: getCanvasContext()
    }
    this.setMap = this.setMap.bind(this)
    this.runGame = this.runGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.toggleTile = this.toggleTile.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
    this.clearGame = this.clearGame.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
    this.loadSave = this.loadSave.bind(this)
    this.saveMap = this.saveMap.bind(this)
    this.deleteSave = this.deleteSave.bind(this)
    this.setGen = this.setGen.bind(this)
    this.saveWindow = this.saveWindow.bind(this)
  }

  componentDidMount () {
    workArr = new Array(this.state.size * this.state.size).fill(0)
    this.canvasDraw(workArr)
    window.addEventListener('keydown', e => this.handleKey(e))
    this.getSaves()
    // console.log(this.state.field)
  }

  componentDidUpdate () {
    this.canvasDraw(workArr)
  }

  setGen () {
    const gen = document.getElementById('set-gen').value
    if (gen > generation || gen < 0) {
      alert('That generation does not exist')
    } else {
      workArr = gameRun[gen]
      generation = gen
      this.canvasDraw(workArr)
      this.setState({
        generation: gen
      })
    }
  }

  setGenReached () {
    this.setState({
      genReached: gameRun.length - 1
    })
  }

  saveWindow () {
    document.getElementById('save-game-window').classList.toggle('hidden')
    document.getElementById('save-button').classList.toggle('hidden')
    const saving = this.state.saving
    this.setState({
      saving: !saving
    })
    // saving = !saving
  }

  loadSave (arr) {
    this.clearGame()
    arr = JSON.parse(arr)
    if (arr.length === this.state.size * this.state.size) {
      workArr = arr
      this.setLiveCells(arr)
      this.canvasDraw(workArr)
    } else {
      makeRandomMap(this.state.size); alert('Bad save file')
    }
  }

  deleteSave (id) {
    delSave(id)
      .then(x => {
        this.getSaves()
      })
  }

  saveMap (name, desc) {
    const save = {
      id: null,
      name: name,
      description: desc,
      fieldData: workArr
    }
    saveField(save)
      .then(x => {
        this.getSaves()
      })
      .then(x => {
        this.saveWindow()
      })
  }

  getSaves () {
    return getSaves()
      .then(saves => {
        // console.log(saves.saves)
        this.setState({
          saves: saves.saves
        })
      })
  }

  handleKey (e) {
    const focus = (document.activeElement === document.getElementById('set-gen'))
    if (!focus && !this.state.saving) {
      // console.log(e)
      e.preventDefault()
      switch (e.key) {
        case ' ':
          this.state.gameRunning
            ? this.pauseGame()
            : this.runGame()
          break
        case 'ArrowLeft':
        case 'a':
          this.showPrevGen()
          break
        case 'ArrowRight':
        case 'd':
          this.showNextGen(workArr)
          break
        case 'ArrowDown':
        case 's':
          this.clearGame()
          break
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          this.setMap()
          break
        case '1':
          this.setSpeed(600)
          break
        case '2':
          this.setSpeed(300)
          break
        case '3':
          this.setSpeed(120)
          break
        case '4':
          this.setSpeed(30)
          break
        case '5':
          this.setSpeed(1)
          break
      }
    }
  }

  canvasDraw (cells, context) {
    const canvas = document.getElementById('game-canvas')
    const tileSize = 3
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      cells.forEach(cell => {
        const tcrds = this.state.field[cell].canvasTileCrds
        ctx.fillStyle = '#008000'
        ctx.fillRect(tcrds.x, tcrds.y, tileSize, tileSize)
      })
      // for (let i = 0; i < this.state.size * this.state.size; i++) {
      //   ctx.fillstyle = map[i] ? ctx.fillStyle = '#008000' : ctx.fillStyle = 'rgb(224, 224, 224)'
      // }

      // map.forEach((cell, idx) => {
      //   const tcrds = canvasTileCoords(idx, this.state.size, tileSize)
      //   if (cell) {
      //     ctx.fillStyle = '#008000'
      //   } else {
      //     ctx.fillStyle = 'rgb(224, 224, 224)'
      //   }
      //   ctx.fillRect(tcrds.x, tcrds.y, tileSize, tileSize)
      // })
    }
  }

  toggleTile = (crds) => {
    const idx = coordsToIdx(crds, this.state.size)
    if (this.state.gameRunning === false) {
      const liveDisp = document.getElementById('live-cells')
      let liveCellText = liveDisp.innerText
      let liveCells = Number(liveCellText.substring(13))
      if (workArr[idx]) {
        workArr[idx] = 0
        liveCells--
      } else {
        workArr[idx] = 1
        liveCells++
      }
      this.setLiveCells(null, liveCells)
    }
    this.canvasDraw(workArr)
  }

setSpeed = (speed) => {
  let wasRunning = this.state.gameRunning
  this.pauseGame()
  this.setState({
    runSpeed: speed
  }, () => {
    if (wasRunning) {
      this.runGame(false)
    }
  })
}

setLiveCells = (field, val) => {
  let live
  if (field) {
    live = field.filter(cell => cell === 1)
  }
  this.setState({
    liveCells: val || live.length
  })
}

clearGame = () => {
  this.pauseGame()
  var mapArr = new Array(this.state.size * this.state.size).fill(0)
  generation = 0
  workArr = mapArr
  gameRun = []
  this.setState({
    generation: 0,
    mapArr: mapArr,
    liveCells: 0,
    genReached: 0
  })
}

setMap = () => {
  const newMap = makeRandomMap(this.state.size)
  const liveCells = []
  newMap.map.forEach((cell, idx) => {
    if (cell) {
      liveCells.push(idx)
    }
  })
  this.canvasDraw(liveCells)
  gameRun.push(newMap.map)
  workArr = newMap.map
  checkSet = newMap.checkSet
  this.setState({
    generation: 0,
    liveCells: newMap.liveCells
  })
}

pauseGame = () => {
  clearInterval(this.state.game)
  const gen = generation
  const live = workArr.filter(cell => cell === 1)
  const genReached = gameRun.length - 1 >= 0 ? gameRun.length - 1 : 0
  this.setState({
    gameRunning: false,
    mapArr: workArr,
    generation: gen,
    liveCells: live.length,
    genReached: genReached
  })
}

runGame = (singleGen) => {
  if (!this.state.gameRunning) {
    if (singleGen) {
      this.showNextGen(workArr)
    } else {
      generation = this.state.generation
      this.setState({
        mapArr: workArr,
        game: setInterval(() => this.showNextGen(workArr), this.state.runSpeed),
        gameRunning: true
      }, () => {})
    }
  }
}

toggleGrid = () => {
  alert('Unimplemented, sorry')
  // grid ? grid = false : grid = true
  // const canvas = document.getElementById('game-canvas')
  // canvas.classList.toggle('canvas-border')
  // this.canvasDraw(workArr)
}

showNextGen = (field) => {
  let checkGen
  gameRun.length > 3 ? checkGen = gameRun[gameRun.length - 2] : checkGen = null
  let nextGen = nextGeneration(field, this.state.size, checkSet, this.state.field)
  checkSet = nextGen.checkSet
  generation++
  workArr = nextGen.arr
  gameRun.push(workArr)
  let liveCells = nextGen.live
  if (liveCheck.length < 3) {
    liveCheck.unshift(liveCells)
    changed.unshift(nextGen.changed)
  } else {
    liveCheck.pop(); liveCheck.unshift(liveCells)
    changed.pop(); changed.unshift(nextGen.changed)
  }

  document.getElementById('gen').innerHTML = `Current Generation: ${generation}`
  document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells}`
  this.canvasDraw(nextGen.liveCells)
  // const allEqual = liveCheck.every(v => v === liveCheck[0])
  if (Math.abs(liveCheck[2] - liveCheck[1] < 4)) {
    const equal = changed[0].every((v, i) => v === changed[1][i])
    if (equal) {
      this.pauseGame()
    }
  }
}

showPrevGen () {
  if (generation >= 1) {
    const prevGen = gameRun[gameRun.length - 2] || gameRun[0]
    workArr = prevGen
    generation--
    gameRun.pop()
    const liveCells = prevGen.filter(val => val === 1)
    document.getElementById('gen').innerHTML = `Current Generation: ${generation}`
    document.getElementById('live-cells').innerHTML = `Living Cells: ${liveCells.length}`
    this.canvasDraw(prevGen)
  }
}

render () {
  return (
    <Router>
      <div id ='whole-page' className = 'flex'>
        <h1 id = 'main-title flex'>The Game of Life</h1>
        <div className = 'navbar flex'>
          <Link to="/"><sp className = 'nav-button'>Home</sp></Link>
          <Link to="/instructions"><sp className = 'nav-button'>Instructions</sp></Link>
          <Link to="/game"><sp className = 'nav-button'>Game</sp></Link>
        </div>
        <hr></hr>
        <Switch>
          <Route exact path = '/' component = {() => <Home/>} />
          <Route path = '/game' component = {() => <GameView
            genReached = {this.state.genReached}
            setGen = {this.setGen}
            saving = {this.state.saving}
            saveWindow = {this.saveWindow}
            deleteSave = {this.deleteSave}
            saveField = {this.saveMap}
            loadSave = {this.loadSave}
            saves = {this.state.saves}
            toggleGrid = {this.toggleGrid}
            grid = {this.props.grid}
            liveCells= {this.state.liveCells}
            running = {this.state.gameRunning}
            setSpeed = {this.setSpeed}
            speed = {this.state.runSpeed}
            clearGame = {this.clearGame}
            toggleTile = {this.toggleTile}
            runGame = {this.runGame}
            pauseGame = {this.pauseGame}
            setMap = {this.setMap}
            mapArr ={this.state.mapArr}
            gen = {this.state.generation}
          />}
          />
          {/* <button onMouseDown = {() => checkGame()}>Check gameRun</button> */}
          <Route path = '/instructions' component = {() => <Instructions/>} />
        </Switch>
      </div>
    </Router>
  )
}
}

const mapStateToProps = state => {
  return {
    grid: state.map.grid
  }
}

export default connect(mapStateToProps)(App)

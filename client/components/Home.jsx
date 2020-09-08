import React from 'react'

const Home = () => {
  return (
    <div className = 'page flex align-top'>
      <div id = 'landing-description'>
        <p style = {{ marginTop: '10%' }}>
          The Game of Life is a cellular automaton invented by mathematician John Conway in 1970.
          The game consists of a field of square cells, normally on an infinite grid but in this implementation
          on a limited grid with edge wrapping, i.e. cells on opposite sides of the field border each other.
          <br/><br/>
          Each cell can be either &quot;alive&quot; or &quot;dead&quot;, and the game proceeds in a series of generations
          in which each cell may alter its state based on considering the states of eight neighbouringcells on
          and applying three rules.
          <br/><br/>
          Rule 1: Any live cell with exactly two or three live neighbours stays alive.
          <br/><br/>
          Rule 2: Any dead cell with exactly three live neighbours becomes alive.
          <br/><br/>
          Rule 3: All other cells stay or become dead.
          <br/><br/>
          Taken together these rules can produce can produce patterns and effects of staggering beauty and complexity.
        </p>
      </div>
    </div>
  )
}

export default Home

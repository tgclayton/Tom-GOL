import React from 'react'

const Home = () => {
  return (
    <div className = 'page'>
      <div id = 'landing-description'>
        <p>
          The Game of Life is a cellular automaton invented by mathematician John Conway in 1970.

          The game consists of a field of square cells, nominally on an infinite grid but in this implementation
          on a limited grid with edge wrapping, i.e. cells on opposite sides of the field border each other.
        </p>
      </div>
    </div>
  )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Link to ='/game'>
      <button>Go to Game</button>
    </Link>
  )
}

export default Home

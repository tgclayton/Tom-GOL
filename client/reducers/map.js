import { TOGGLE_GRID } from '../actions/toggleGrid'

const initial = {
  grid: true
}

export default function toggleGrid (state = initial, action) {
  let g
  switch (action.type) {
    case TOGGLE_GRID:
      if (state.grid) {
        g = false
      } else {
        g = true
      }
      return {
        grid: g
      }

    default:
      return state
  }
}


export const setState = (state) => {
  return {
    type: 'SET_STATE',
    state
  }
}

export const submitAddr = (addr) =>{
  return {
    type: 'SUBMIT_ADDR',
    addr
  }
}

// Submit coordinates for a user
export const submitCoords = (lat, lng) => {
  return {
    type: 'SUBMIT_COORD',
    lat,
    lng
  }
}

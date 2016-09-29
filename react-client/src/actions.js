import fetch from 'isomorphic-fetch'


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

// Request locos
export const requestLocos = () => {
  return {
    type: 'REQUEST_LOCOS',
  }
}

// Receive locos from server
export const receiveLocos = (json) => {
  return {
    type: 'RECEIVE_LOCOS',
    locos: json.data.children.map(child => child.data),
  }
}

// Thunk to get posts
export const fetchLocos = () => {
  // Return a function that will handle the request and receive
  return (dispatch) => {
    dispatch(requestLocos());
    return fetch('/locos')
      .then(response => response.json())
      .then(json => dispatch(receiveLocos(json)));
  }
}

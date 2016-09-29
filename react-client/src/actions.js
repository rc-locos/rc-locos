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
    locos: json,
  }
}

// Thunk to get posts
export const fetchLocos = () => {
  // Return a function that will handle the request and receive
  return (dispatch) => {
    dispatch(requestLocos());
      return fetch('/locos', {credentials: 'include'})
	  .then(response => {
	      if (response.status >= 400) {
		  throw new Error("Bad response from server");
	      }
	      return response.json();
	  })
          .then(json => {
	      dispatch(receiveLocos(json));
	      //console.log(json);
	  });
  }
}

// Thunk to post location information to server
export const updateLoco = (lat, lng) => {
    return (dispatch) => {
	return fetch('/update', {
	    credentials: 'include',
	    method: 'post',
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
		lat,
		lng
	    })
	}).then(response => {
	    if (response.status >= 400) {
		throw new Error("Bad response from server");
	    }
	    dispatch(fetchLocos());
	}).catch(err => {
	    console.log(err);
	});
	return null; 
    }
}

import {Map, List} from 'immutable';


// const setState = (state, newState) => {
//   return state.merge(newState);
// }

// const submitAddr = (state, address) => {
//   /*   console.log("submitting address: " + address);*/
//   return state;
// }

// const submitCoords = (state, lat, lng) => {
//   /*   console.log("submitting coords: " + lat + "," + lng);*/
//   const newLoco = {
//     id: 'newLoc',
//     name: 'foo',
//     lat: lat,
//     lng: lng
//   };
//   // If an element in locos already has id='newLoc', then replace that
//   const locos = state.get('locos').filter((loc) => loc.id !== 'newLoc');
//   return state.set('locos', locos.push(newLoco));
// }

// Request locos
const requestLocos = (state) => {
  return state;
}

// Receive locos from server
const receiveLocos = (state, locos) => {
    return state.set('locos', List(locos));
}

// Receive sharing settings for the user from server
const receiveSharing = (state, sharing) => {
    return state.set('isSharing', sharing);
}

export default (state = Map(), action) => {
  switch (action.type) {
    // case 'SET_STATE':
    //   return setState(state, action.state);
    // case 'SUBMIT_ADDR':
    //   return submitAddr(state, action.addr);
    // case 'SUBMIT_COORD':
    //   return submitCoords(state, action.lat, action.lng);
    case 'REQUEST_LOCOS':
      return requestLocos(state);
    case 'RECEIVE_LOCOS':
      return receiveLocos(state, action.locos);
  case 'RECEIVE_SHARING':
      return receiveSharing(state, action.isShared);
    default:
      return state;
  }
}

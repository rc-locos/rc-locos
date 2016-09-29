import {Map} from 'immutable';


const setState = (state, newState) => {
  return state.merge(newState);
}

const submitAddr = (state, address) => {
  console.log("submitting address: " + address);
  return state;
}

const submitCoords = (state, lat, lng) => {
  console.log("submitting coords: " + lat + "," + lng);
  const newLoco = {
    id: 100,
    name: 'foo',
    lat: lat,
    lng: lng
  };
  console.log('hello world');
  console.log(state.updateIn(['locos'], arr => arr.push(newLoco)));
  //console.log(state.set('locos', state.get('locos').push(newLoco)));
  return state.update('locos', arr => arr.push(newLoco));
}

export default (state = Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SUBMIT_ADDR':
      return submitAddr(state, action.addr);
    case 'SUBMIT_COORD':
      return submitCoords(state, action.lat, action.lng);
    default:
      return state;
  }
}

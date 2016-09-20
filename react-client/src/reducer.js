import {Map} from 'immutable';


const setState = (state, newState) => {
  return state.merge(newState);
}

const submitAddr = (state, address) => {
  console.log("submitting address: " + address);
  return state;
}

export default (state = Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SUBMIT_ADDR':
      return submitAddr(state, action.addr);
    default:
      return state;
  }
}

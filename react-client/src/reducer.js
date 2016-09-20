import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

export default (state = Map(), action) => {
    switch (action.type) {
    case 'SET_STATE':
	return setState(state, action.state);
    // case 'SET_CLIENT_ID':
    // 	return state.set('clientId', action.clientId);
    // case 'SET_CONNECTION_STATE':
    // 	return setConnectionState(state, action.state, action.connected);
    // case 'SET_STATE':
    // 	return resetVote(setState(state, action.state));
    // case 'VOTE':
    // 	return vote(state, action.entry);
    default:
	return state;
    }
}

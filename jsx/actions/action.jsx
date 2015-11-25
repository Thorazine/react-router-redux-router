//import { ActionCreators } from 'redux-undo';

export function incrementCounter(){
	return {
		type: 'INCREMENT'
	}
}

export function decrementCounter(){
	return {
		type: 'DECREMENT'
	}
}

export function updateTitle(text) {
	return {
		type: 'TITLE',
		text: text,
	}
}
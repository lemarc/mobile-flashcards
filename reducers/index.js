import {
	RECEIVE_DECKS,
	ADD_DECK
} from '../actions'

function decks(state={}, action) {
	const { type, decks, deck } = action
	switch (type) {
		// Receive all decks and save as state
		case RECEIVE_DECKS :
			return decks
		case ADD_DECK :
			return {
				...state,
				[deck.title]: deck
			}
		default :
			return state
	}
}

export default decks
import {
	RECEIVE_DECKS,
	ADD_DECK,
	ADD_CARD,
	DELETE_DECK
} from '../actions'

function decks(state={}, action) {
	const { type, decks, title, card } = action
	switch (type) {
		// Receive all decks and save as state
		case RECEIVE_DECKS :
			return decks
		case ADD_DECK :
			return {
				...state,
				[title]: {
					title,
					cards: []
				}
			}
		case ADD_CARD :
			let cards = state[title].cards.slice()
			cards.push(card)
			return {
				...state,
				[title]: {
					...state[title],
					cards
				}
			}
		case DELETE_DECK :
			let copy = {...state}
			delete copy[title]
			return copy
		default :
			return state
	}
}

export default decks
import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then( json => JSON.parse(json) )
}

// take in a single id (title) argument and return the deck associated with that id.
export function getDeck(title) {
	return getDecks()
		.then( decks => decks[title] )
}

// take in a single title argument and add it to the decks. 
export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: { title, cards: [] } }))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card) {
	return getDeck(title)
		.then( deck => {
			let cards = deck.cards.slice()
			cards.push(card)
			AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: { title, cards } }))
		})
}



export function saveDecks(decks) {
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

/*
// For testing
const defaultDecks = {
	'Sample Deck': {
		title: 'Sample Deck',
		cards: [
			{
				question:'Is this a question?',
				answer:'Yes.'
			},
			{
				question:'',
				answer: ''
			}
		]
	},
	'Norwegian': {
		title: 'Norwegian',
		cards: [
			{
				question:'Good morning.',
				answer:'God morgen.'
			},
			{
				question:'What time is it?',
				answer: 'Hva er klokka?'
			}
		]
	}
}

saveDecks(defaultDecks)
*/
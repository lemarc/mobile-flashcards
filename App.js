import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'

import DeckList from './components/DeckList'

import { getDecks } from './utils/api'
import { receiveDecks } from './actions'

const store = createStore(reducer)

export default class App extends Component {
	componentDidMount() {
		getDecks().then( decks => store.dispatch( receiveDecks(decks) ))
	}

	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<DeckList />
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

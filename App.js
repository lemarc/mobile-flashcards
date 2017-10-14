import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Provider } from 'react-redux'
import store from './store'

import DeckList from './components/DeckList'

import { loadState } from './utils/api'

export default class App extends Component {
	componentDidMount() {
		loadState()
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

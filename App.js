import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './store'

import StatusBarContainer from './components/StatusBarContainer'
// Views
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

import { loadState } from './utils/api'

const stackNavOptions = {
	headerTintColor: 'white',
	headerStyle: {
		backgroundColor: 'black'
	},
	headerTitleStyle: {
		fontSize: 30
	}
}

const MainNavigator = StackNavigator({
	Home: {
		screen: DeckList,
		navigationOptions: {
			...stackNavOptions,
			title: 'Decks'
		}
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: stackNavOptions
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			...stackNavOptions,
			title: 'Add Card'
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			...stackNavOptions,
			title: 'New Deck'
		}
	}
})

export default class App extends Component {
	componentDidMount() {
		loadState()
	}

	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<StatusBarContainer backgroundColor='white' />
					<MainNavigator />
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

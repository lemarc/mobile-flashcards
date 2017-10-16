import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

import DeckPreview from './DeckPreview'

class DeckList extends Component {

	render() {
		const { deckTitles } = this.props
		return (
			<View style={styles.container}>
				<FlatList 
					data={deckTitles}
					renderItem={ ({item}) => <DeckPreview title={item}/> }
					keyExtractor={ item => item }
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

function mapStateToProps(state) {
	return {
		deckTitles: Object.keys(state)
	}
}

export default connect(mapStateToProps)(DeckList)

//<Text>{JSON.stringify(decks)}</Text>
/*
function mapStateToProps(state) {
	return {
		decks: Object.keys(state).reduce( (acc, key) => {
			acc.push(state[key])
			return acc
		}, [])
	}
}
*/
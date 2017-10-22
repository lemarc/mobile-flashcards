import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import DeckPreview from './DeckPreview'

function AddDeckLink({navigation}) {
	return (
		<TouchableOpacity
			style={styles.addDeckLink}
			onPress={()=>navigation.navigate('AddDeck')}>
			<Text style={styles.addDeckText}>Create New Deck</Text>
		</TouchableOpacity>
	)
}

class DeckList extends Component {

	render() {
		const { deckTitles, navigation } = this.props
		return (
			<View style={styles.container}>
				
				<FlatList 
					data={deckTitles}
					renderItem={ ({item}) => <DeckPreview title={item} navigation={navigation}/> }
					keyExtractor={ item => item }
					ListHeaderComponent={<AddDeckLink navigation={navigation}/>}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	addDeckLink: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 7,
		margin: 10,
		borderRadius: 10,
		borderStyle: 'dashed',
		borderColor: 'black',
		borderWidth: 3
	},
	addDeckText: {
		fontSize: 24
	}
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
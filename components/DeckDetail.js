import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

import Button from './Button'

import { deleteDeck } from '../store'
import { saveState } from '../utils/api'

class DeckDetail extends Component {
	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title
		}
	}
	
	state = {
		confirmDelete: false
	}

	render() {
		const { title, cardCount, navigation, deleteDeck } = this.props
		const { confirmDelete } = this.state
		return (
			<View style={styles.container}>
				<Text style={styles.titleText}>{title}</Text>
				<Text style={styles.countText}>{cardCount} cards</Text>
				<Button
					text='Add Card'
					onPress={()=>navigation.navigate(
					'AddCard',
					{ title }
				)}/>
				{cardCount>0 && <Button
					text='Start Quiz'
					onPress={()=>navigation.navigate(
					'Quiz',
					{ title }
				)}/>}
				<Button
					backgroundColor='red'
					text='Delete Deck'
					onPress={()=>this.setState({confirmDelete: true})}
				/>
				{confirmDelete && <Text style={styles.confirmation}>
					Are you sure you want to delete deck {title}? This can't be undone.
				</Text>}
				{confirmDelete && <Button
					backgroundColor='red'
					text='Confirm'
					onPress={()=>{
						navigation.goBack()
						deleteDeck()
						saveState()
				}}/>}
				{confirmDelete && <Button
					text='Cancel'
					onPress={()=>this.setState({confirmDelete: false})}
				/>}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	titleText: {
		fontSize: 48,
		textAlign: 'center',
		padding: 10,
		fontWeight: 'bold'
	},
	countText: {
		fontSize: 24,
		textAlign: 'center',
		padding: 10
	},
	confirmation: {
		fontSize: 20,
		textAlign: 'center',
		padding: 10
	}
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params
	const deck = state[title]
	return {
		title,
		cardCount: deck ? deck.cards.length : 0
	}
}

function mapDispatchToProps(dispatch, {navigation}) {
	const { title } = navigation.state.params
	return {
		deleteDeck: () => dispatch(deleteDeck(title))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)

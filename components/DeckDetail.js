import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

import Button from './Button'

class DeckDetail extends Component {
	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title
		}
	}
	
	render() {
		const { title, cards, navigation } = this.props
		return (
			<View style={styles.container}>
				<Button
					text='Add Card'
					onPress={()=>navigation.navigate(
					'AddCard',
					{ title }
				)}/>
				<Button
					text='Start Quiz'
					onPress={()=>navigation.navigate(
					'Quiz',
					{ title }
				)}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params
	return {
		title,
		cards: state[title].cards
	}
}

export default connect(mapStateToProps)(DeckDetail)

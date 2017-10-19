import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends Component {
	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title
		}
	}
	
	render() {
		const { title, cards } = this.props
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={()=>this.props.navigation.navigate(
					'AddCard',
					{ title }
				)}>
					<Text style={styles.buttonText}>
						Add Card
					</Text>
				</TouchableOpacity>
				<Text>{JSON.stringify(cards)}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	button: {
		backgroundColor: 'blue',
		borderRadius: 5,
		padding: 5
	},
	buttonText: {
		color: 'white'
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

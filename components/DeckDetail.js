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
		backgroundColor: 'black',
		borderRadius: 10,
		margin: 5,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10,
		alignSelf: 'center'
	},
	buttonText: {
		fontSize: 20,
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

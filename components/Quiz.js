import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
	state = {
		cardIndex: 0,
		correct: 0
	}
	render() {
		const { title, cards } = this.props
		return (
			<View style={styles.container}>
				<Text>{JSON.stringify(cards)}</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={()=>null}>
					<Text style={styles.buttonText}>
						Flip
					</Text>
				</TouchableOpacity>
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

export default connect(mapStateToProps)(Quiz)

import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addCard } from '../store'
import { saveState } from '../utils/api'

class AddCard extends Component {
	state = {
		question: '',
		answer: ''
	}

	render() {
		const { title, cardCount, navigation, addCard } = this.props
		const { question, answer } = this.state

		return (
			<View style={styles.container}>
				<View style={styles.input}>
					<Text>Question:</Text>
					<TextInput
						placeholder='question' 
						value={question}
						onChangeText={ text => this.setState( () => ({question: text}) ) }
					/>
				</View>
				<View style={styles.input}>
					<Text>Answer:</Text>
					<TextInput
						placeholder='answer' 
						value={answer}
						onChangeText={ text => this.setState( () => ({answer: text}) ) }
					/>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={()=>{
						addCard({question, answer})
						saveState()
						navigation.goBack()
					}}>
					<Text style={styles.buttonText}>
						Add
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		margin: 10,
		padding: 10,
		backgroundColor: '#ddd'
	},
	button: {
		backgroundColor: 'blue',
		borderRadius: 5,
		padding: 5,
		alignSelf: 'center'
	},
	buttonText: {
		color: 'white'
	}
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params
	return {
		title
	}
}

function mapDispatchToProps(dispatch, {navigation}) {
	const { title } = navigation.state.params
	return {
		addCard: card => dispatch( addCard(title, card) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

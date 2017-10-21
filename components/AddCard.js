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
					<Text style={styles.inputTitle}>Question</Text>
					<TextInput
						style={styles.textInput}
						placeholder='question' 
						value={question}
						onChangeText={ text => this.setState( () => ({question: text}) ) }
					/>
				</View>
				<View style={styles.input}>
					<Text style={styles.inputTitle}>Answer</Text>
					<TextInput
						style={styles.textInput}
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
		backgroundColor: 'black',
	},
	inputTitle: {
		fontSize: 20,
		color: 'white',
		alignSelf: 'center'
	},
	textInput: {
		fontSize: 20,
		backgroundColor: 'white',
		margin: 5,
		padding: 5
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

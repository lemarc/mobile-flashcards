import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

import InputArea from './InputArea'
import Button from './Button'

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
				<InputArea
					title='Question'
					value={question}
					placeholder='question'
					onChangeText={ text => this.setState( () => ({question: text}) ) }
				/>
				<InputArea
					title='Answer'
					value={answer}
					placeholder='answer'
					onChangeText={ text => this.setState( () => ({answer: text}) ) }
				/>
				<Button
					text='Add'
					onPress={()=>{
						addCard({question, answer})
						saveState()
						navigation.goBack()
				}}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

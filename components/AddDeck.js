import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../store'
import { saveState } from '../utils/api'

class AddDeck extends Component {
	state = {
		title: ''
	}

	render() {
		const { titles, navigation, addDeck } = this.props
		const { title } = this.state

		const alreadyExists = titles.indexOf(title) >= 0

		return (
			<View style={styles.container}>
				<View style={styles.input}>
					<Text>Title:</Text>
					<TextInput
						placeholder='title' 
						value={title}
						onChangeText={ text => this.setState( () => ({title: text}) ) }
					/>
				</View>
				<TouchableOpacity
					disabled={alreadyExists || !title }
					style={styles.button}
					onPress={()=>{
						addDeck(title)
						//saveState()
						navigation.goBack()
					}}>
					<Text style={styles.buttonText}>
						Add
					</Text>
				</TouchableOpacity>
				{ alreadyExists &&
					<Text style={{color: 'red'}}>
						A deck with this title already exists.
					</Text>
				}
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

function mapStateToProps(state) {
	return {
		titles: Object.keys(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addDeck: title => dispatch( addDeck(title) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)

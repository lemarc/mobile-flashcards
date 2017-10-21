import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addDeck } from '../store'
import { saveState } from '../utils/api'

class AddDeck extends Component {
	state = {
		title: ''
	}

	render() {
		const { titles, navigation, addDeck } = this.props
		const { title } = this.state

		// Check if there is already a deck with the same title
		const alreadyExists = titles.indexOf(title) >= 0

		return (
			<View style={styles.container}>
				<View style={styles.input}>
					<Text style={styles.inputTitle}>Title</Text>
					<TextInput
						style={styles.textInput}
						placeholder='title' 
						value={title}
						onChangeText={ text => this.setState( () => ({title: text}) ) }
					/>
				</View>
				<TouchableOpacity
					disabled={alreadyExists || !title}
					style={styles.button}
					onPress={()=>{
						addDeck(title)
						//saveState()

						//navigation.navigate( 'DeckDetail', { title } )

						// Doesn't show an animation and there doesn't seem to be a fix currently
						// https://github.com/react-community/react-navigation/issues/1663
						navigation.dispatch(new NavigationActions.reset({
							index: 1,
							actions: [
								NavigationActions.navigate({ routeName: 'Home' }),
								NavigationActions.navigate({ routeName: 'DeckDetail', params: {title} })
							]
						}))

						
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

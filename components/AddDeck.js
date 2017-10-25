import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import InputArea from './InputArea'
import Button from './Button'

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
				<InputArea
					title='Title'
					value={title}
					placeholder='title'
					onChangeText={ text => this.setState( () => ({title: text}) ) }
				/>
				<Button
					disabled={alreadyExists || !title}
					text='Add'
					onPress={()=>{
						addDeck(title)
						saveState()

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
				}}/>

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

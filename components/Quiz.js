import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

import Button from './Button'

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
				<Button
					text='Flip'
					onPress={()=>null}
				/>
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

export default connect(mapStateToProps)(Quiz)

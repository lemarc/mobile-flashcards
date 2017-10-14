import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckList extends Component {
	render() {
		return (
			<View>
				<Text>{JSON.stringify(this.props)}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

function mapStateToProps(state) {
	return {
		decks: state
	}
}

export default connect(mapStateToProps)(DeckList)
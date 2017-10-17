import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends Component {
	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title
		}
	}
	
	render() {
		const { title, cardCount } = this.props
		return (
			<View style={styles.container}>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params
	return {
		title,
		cards: state[title].cards
	}
}

export default connect(mapStateToProps)(DeckDetail)

import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckPreview extends Component {
	render() {
		const { title, cardCount, navigation } = this.props
		return (
			// It is possible to navigate to the same view twice by clicking fast
			// Won't be implementing fix since ideal solution requires modifying files in node_modules 
			// https://github.com/react-community/react-navigation/issues/271
			<TouchableOpacity
				style={styles.container}
				onPress={()=>navigation.navigate(
				'DeckDetail',
				{ title }
			)}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.count}>{cardCount} cards</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		margin: 10,
		backgroundColor: 'black',
		borderRadius: 10
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white'
	},
	count: {
		fontSize: 20,
		color: 'white'
	}
})

function mapStateToProps(state, {title}) {
	return {
		title,
		cardCount: state[title].cards.length
	}
}

export default connect(mapStateToProps)(DeckPreview)

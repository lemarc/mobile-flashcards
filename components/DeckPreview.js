import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckPreview extends Component {
	render() {
		const { title, cardCount } = this.props
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={()=>this.props.navigation.navigate(
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
		backgroundColor: '#bbb',
		borderRadius: 10
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	count: {
		fontSize: 20
	}
})

function mapStateToProps(state, {title}) {
	return {
		title,
		cardCount: state[title].cards.length
	}
}

export default connect(mapStateToProps)(DeckPreview)

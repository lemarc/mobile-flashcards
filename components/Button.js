import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function Button({onPress, text, backgroundColor, ...props}) {
	backgroundColor = backgroundColor || 'black'
	return (
		<TouchableOpacity
			style={[styles.button, {backgroundColor}]}
			onPress={onPress}
			{...props}
		>
			<Text style={styles.buttonText}>
				{text}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
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
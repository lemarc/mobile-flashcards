import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

export default function InputArea({onChangeText, value, title, ...props}) {
	return (
		<View style={styles.input}>
			<Text style={styles.inputTitle}>{title}</Text>
			<TextInput
				style={styles.textInput}
				value={value}
				onChangeText={onChangeText}
				{...props}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
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
	}
})
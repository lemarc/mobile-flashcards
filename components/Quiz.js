import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import Button from './Button'
import FlippableCard from './FlippableCard'

function GradeButton({onPress, text, backgroundColor, ...props}) {
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

class Quiz extends Component {
	state = {
		cardIndex: 0,
		correct: 0,
		flipped: false
	}

	restart = () => {
		this.setState({
			cardIndex: 0,
			correct: 0,
			flipped: false
		})
	}

	render() {
		const { title, cards, navigation } = this.props
		const { cardIndex, correct, flipped } = this.state
		const cardCount = cards.length

		// Show results after last card
		if (cardIndex === cardCount) {
			const percentage = correct / cardCount * 100 >> 0
			return (
				<View style={styles.container}>
					<Text style={styles.scoreText}>You got {correct} out of {cardCount} correct!</Text>
					<Text style={styles.percentageText}>{percentage}%</Text>
					<Button
						text='Start Over'
						onPress={this.restart}
					/>
					<Button
						text='Finished'
						onPress={()=>{navigation.goBack()}}
					/>
				</View>
			)
		}

		const { question, answer } = cards[cardIndex]
		
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Question {cardIndex+1} of {cardCount}</Text>
				</View>
				<FlippableCard
					cardIndex={cardIndex}
					question={question}
					answer={answer}
					onFlip={()=>this.setState({flipped:true})}
				/>
				<View style={styles.grade}>
					{ flipped && <GradeButton
						//disabled={!flipped}
						text='Correct'
						onPress={()=>this.setState({flipped: false, cardIndex: cardIndex+1, correct: correct+1})}
						backgroundColor='green'
					/>}
					{ flipped && <GradeButton
						//disabled={!flipped}
						text='Incorrect'
						onPress={()=>this.setState({flipped: false, cardIndex: cardIndex+1})}
						backgroundColor='red'
					/>}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		flex: .5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	grade: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'grey'
	},
	button: {
		flex: 1,
		borderRadius: 10,
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 20,
		color: 'white'
	},
	scoreText: {
		fontSize: 28,
		textAlign: 'center',
		padding: 10
	},
	percentageText: {
		fontSize: 60,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10
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
import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native'

import Button from './Button'

export default class FlippableCard extends Component {

	state = {
		frontScale: new Animated.Value(1),
		backScale: new Animated.Value(0),
		face: 'front',
	}

	componentWillReceiveProps({cardIndex}) {
		if (!(cardIndex===this.props.cardIndex))
		this.setState({
			frontScale: new Animated.Value(1),
			backScale: new Animated.Value(0),
			face: 'front',
		})
	}

	animateFlip = () => {
		const { face, frontScale, backScale } = this.state
		if (face==='front') {
			this.setState({face:'flipping'})
			Animated.sequence([
				Animated.timing(frontScale, { duration: 200, toValue: 0 }),
				Animated.timing(backScale, { duration: 200, toValue: 1 }),
			]).start(()=>this.setState({face:'back'}))
		}
		if (face==='back') {
			this.setState({face:'flipping'})
			Animated.sequence([
				Animated.timing(backScale, { duration: 200, toValue: 0 }),
				Animated.timing(frontScale, { duration: 200, toValue: 1 }),
			]).start(()=>this.setState({face:'front'}))
		}
	}

	render(){
		const { frontScale, backScale } = this.state
		const {question, answer, onFlip} = this.props
		const screenWidth = Dimensions.get('window').width

		const width = screenWidth * 3/5 >> 0
		const height = screenWidth

		return (
			<View style={styles.container}>
				<Text>{frontScale.value}</Text>
				<View style={styles.container}>
					<Animated.View
						style={[styles.face, {width, height}, {transform: [{scaleX: frontScale}]}]}
					>
						<Text style={styles.text}>{question}</Text>
					</Animated.View>
					<Animated.View
						style={[styles.face, {width, height}, {transform: [{scaleX: backScale}]}]}
					>
						<Text style={styles.text}>{answer}</Text>
					</Animated.View>
				</View>
				<Button
					text='Flip'
					onPress={()=>{
						this.animateFlip()
						onFlip && onFlip()
					}}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 6,
		backgroundColor: 'grey',
		alignItems: 'center',
		padding: 10
	},
	face: {
		flex: 1,
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 24
	}
})
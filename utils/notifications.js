import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function clearLocalNotifications() {
	AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
	return {
		title: "Don't forget to study!",
		body: "You haven't studied a deck today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then( data => {
			if (data===null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then( ({status}) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate()+1)
							tomorrow.setHours(20)
							tomorrow.setMinutes(0)
							tomorrow.setSeconds(0)

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day'
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}
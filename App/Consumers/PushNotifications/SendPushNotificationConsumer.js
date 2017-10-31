import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import PushNotificationService from '../../Services/PushNotificationService'

const log = debug(`${configs.debugZone}:SendPushNotificationConsumer`)

export default class SendPushNotificationConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'SEND_PUSH_NOTIFICATION_QUEUE'

  // Name of the route in rabbitMQ
  static routeName = 'SEND_PUSH_NOTIFICATION_ROUTE'

  // queue options
  static queueOptions = {
    autoDelete: false,
    exclusive: false
  }

  static async handle (data) {
    log('handle')

    const {receiverUserId, senderFirstName, messageObject} = data

    const {message} = messageObject

    const pushSummary = await PushNotificationService.dispatchPushNotification(receiverUserId, {
      heading: `ʕ·͡ᴥ·ʔ NEW MESSAGE`,
      content: `${senderFirstName}: ${message}`,
      data: {
        messageId: 'NEW_MESSAGE',
        messageObject
      }
    })

    log(pushSummary)
  }
}
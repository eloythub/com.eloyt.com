import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import PushNotificationService from '../../Services/PushNotificationService'

const log = debug(`${configs.debugZone}:SendPushNotificationConsumer`)

export default class SendPushNotificationConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'COM_QUEUE'

  // Name of the route in rabbitMQ
  static routeName = 'SEND_PUSH_NOTIFICATION_ROUTE'

  // queue options
  static queueOptions = {
    autoDelete: false,
    exclusive: false
  }

  static async handle (data) {
    log('handle')

    const {receiverUserId, senderFirstName} = data

    const pushSummary = await PushNotificationService.dispatchPushNotification(receiverUserId, {
      alert: {
        title: `ʕ·͡ᴥ·ʔ NEW MESSAGE`,
        body: `${senderFirstName} sent you a new message`
      }
    })

    log(pushSummary)
  }
}
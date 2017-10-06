import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import PushNotificationService from '../../Services/PushNotificationService'

const log = debug(`${configs.debugZone}:ReactLikeToSnapPushNotificationsConsumer`)

export default class ReactLikeToSnapPushNotificationsConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'COM_QUEUE'

  // Name of the route in rabbitMQ
  static routeName = 'REACT_LIKE_TO_SNAP_PUSH_NOTIFICATION_ROUTE'

  // queue options
  static queueOptions = {
    autoDelete: false,
    exclusive: false
  }

  static async handle (data) {
    log('handle')

    const {receiverUserId, senderFirstName, resourceId} = data

    const pushSummary = await PushNotificationService.dispatchPushNotification(receiverUserId, {
      alert: {
        title: `ˁ(⦿ᴥ⦿)ˀ`,
        body: `${senderFirstName} liked your snap`
      }
    })

    log(pushSummary)
  }
}
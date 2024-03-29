import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import PushNotificationService from '../../Services/PushNotificationService'

const log = debug(`${configs.debugZone}:ReactLikeToSnapPushNotificationsConsumer`)

export default class ReactLikeToSnapPushNotificationsConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'REACT_LIKE_TO_SNAP_PUSH_NOTIFICATION_QUEUE'

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
      heading: `ˁ(⦿ᴥ⦿)ˀ`,
      content: `${senderFirstName} liked your snap`,
      data: {
        messageId: 'REACT_LIKE_TO_SNAP',
        receiverUserId,
        senderFirstName,
        resourceId
      }
    })

    log(pushSummary)
  }
}
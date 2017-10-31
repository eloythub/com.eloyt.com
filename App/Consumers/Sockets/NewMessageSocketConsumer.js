import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import SocketService from '../../Services/SocketService'

const log = debug(`${configs.debugZone}:NewMessageSocketConsumer`)

export default class NewMessageSocketConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'NEW_MESSAGE_SOCKET_QUEUE'

  // Name of the route in rabbitMQ
  static routeName = 'NEW_MESSAGE_SOCKET_ROUTE'

  // queue options
  static queueOptions = {
    autoDelete: false,
    exclusive: false
  }

  static async handle (data) {
    log('handle')

    const {
            receiverUserId,
            senderFirstName,
            messageObject
          } = data

    if (!receiverUserId ||
        !senderFirstName ||
        !messageObject) {
      return
    }

    await SocketService.emitSocket(receiverUserId, 'message-new', {
      receiverUserId,
      senderFirstName,
      messageObject
    })
  }
}

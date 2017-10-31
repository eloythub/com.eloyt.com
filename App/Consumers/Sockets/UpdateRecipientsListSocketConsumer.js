import debug from 'debug'
import configs from '../../../Configs'
import Consumer from '../../Consumer'
import SocketService from '../../Services/SocketService'

const log = debug(`${configs.debugZone}:UpdateRecipientsListSocketConsumer`)

export default class UpdateRecipientsListSocketConsumer extends Consumer{
  static enable = true

  // Name of the queue in rabbitMQ
  static queueName = 'UPDATE_RECIPIENTS_LIST_SOCKET_QUEUE'

  // Name of the route in rabbitMQ
  static routeName = 'UPDATE_RECIPIENTS_LIST_SOCKET_ROUTE'

  // queue options
  static queueOptions = {
    autoDelete: false,
    exclusive: false
  }

  static async handle (data) {
    log('handle')

    const {receiverUserId} = data

    if (!receiverUserId) {
      return
    }

    await SocketService.emitSocket(receiverUserId, 'recipients-update')
  }
}

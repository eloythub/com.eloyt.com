'use strict'

import debug from 'debug'
import configs from '../../Configs'
import UsersService from '../Services/UsersService'
import RabbitMQService from '../Services/RabbitMQService'
import SocketWrapper from '../Sockets/SocketWrapper'

export default class MessagesController {
  static async sendMessage (req, res) {
    const error = debug(`${configs.debugZone}:MessagesController:sendMessage`)

    const {senderUserId, receiverUserId, messageObject} = req.payload

    try {
      const senderUser = await UsersService.findUser(senderUserId)

      RabbitMQService.publish('SEND_PUSH_NOTIFICATION_ROUTE', {
        receiverUserId,
        senderFirstName: senderUser.firstName,
        messageObject
      })

      RabbitMQService.publish('NEW_MESSAGE_SOCKET_ROUTE', {
        receiverUserId,
        senderFirstName: senderUser.firstName,
        messageObject
      })

      res({
        statusCode: 200
      }).code(200)
    } catch (e) {
      error(e.message)

      res({
        statusCode: 500,
        error: e.message
      }).code(500)
    }
  }
};

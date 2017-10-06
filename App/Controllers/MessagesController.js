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

    const socketWrapper = new SocketWrapper

    console.log(socketWrapper.getSocket('test'))

    try {
      const senderUser = await UsersService.findUser(senderUserId)

      RabbitMQService.publish('SEND_PUSH_NOTIFICATION_ROUTE', {
        receiverUserId,
        senderFirstName: senderUser.firstName
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

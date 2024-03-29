'use strict'

import debug from 'debug'
import configs from '../../Configs'
import UsersService from '../Services/UsersService'
import RabbitMQService from '../Services/RabbitMQService'

export default class StreamController {
  static async reactLikeToSnap (req, res) {
    const error = debug(`${configs.debugZone}:StreamController:reactLikeToSnap`)

    const {senderUserId, receiverUserId, resourceId} = req.payload

    try {
      const senderUser = await UsersService.findUser(senderUserId)

      RabbitMQService.publish('REACT_LIKE_TO_SNAP_PUSH_NOTIFICATION_ROUTE', {
        receiverUserId,
        senderFirstName: senderUser.firstName,
        resourceId
      })

      // send message to sockets to update their recipients list
      RabbitMQService.publish('UPDATE_RECIPIENTS_LIST_SOCKET_ROUTE', {
        receiverUserId
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

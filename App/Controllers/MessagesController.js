'use strict'

import debug from 'debug'
import configs from '../../Configs'
import PushNotificationService from '../Services/PushNotificationService'
import UsersService from '../Services/UsersService'

export default class MessagesController {
  static async sendMessage (req, res) {
    const error = debug(`${configs.debugZone}:MessagesController:sendMessage`)

    const {senderUserId, receiverUserId, messageObject} = req.payload


    try {
      const senderUser = await UsersService.findUser(senderUserId)

      const pushSummary = await PushNotificationService.dispatchPushNotification(receiverUserId, {
        alert: {
          title: `ʕ·͡ᴥ·ʔ NEW MESSAGE`,
          body: `${senderUser.firstName} sent you a new message !!!`,
          //'launch-image': senderUser.cloudAvatarUrl
        }
      })

      console.log(pushSummary)

      res({
        statusCode: 200,
        data: pushSummary
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

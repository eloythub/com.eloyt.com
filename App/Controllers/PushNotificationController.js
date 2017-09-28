'use strict'

import debug from 'debug'
import configs from '../../Configs'
import PushNotificationService from '../Services/PushNotificationService'

export default class PushNotificationController {
  static async registerNewDevice (req, res) {
    const error = debug(`${configs.debugZone}:MessagesController:sendMessage`)

    const {userId, token, deviceType} = req.payload

    try {
      const isTokenExists = await PushNotificationService.isTokenExists(userId, deviceType, token)
      if (isTokenExists) {
        return res({}).code(201)
      }

      await PushNotificationService.registerNewToken(userId, deviceType, token)

      res({}).code(201)
    } catch (e) {
      error(e.message)

      res({
        statusCode: 500,
        error: e.message
      }).code(500)
    }
  }
};

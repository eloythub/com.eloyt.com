'use strict'

import debug from 'debug'
import https from 'https'
import configs from '../../Configs'
import DeviceTypesEnum from '../Enums/DeviceTypesEnum'
import PushNotificationRepository from '../Repositories/PushNotificationRepository'

export default class PushNotificationService {
  static async registerNewToken (userId, deviceType, token) {
    const log = debug(`${configs.debugZone}:PushNotificationService:registerNewToken`)

    log('registerNewToken')

    const resultData = await PushNotificationRepository.registerNewToken(userId, deviceType, token)

    return resultData
  }

  static async isTokenExists (userId, deviceType, token) {
    const log = debug(`${configs.debugZone}:PushNotificationService:isTokenExists`)

    log('isTokenExists')

    const resultData = await PushNotificationRepository.isTokenExists(userId, deviceType, token)

    return resultData
  }

  static async dispatchPushNotification (userId, payload) {
    const log = debug(`${configs.debugZone}:PushNotificationService:dispatchPushNotification`)

    log('dispatchPushNotification')

    if (!payload) {
      throw new Error('payload is empty')
    }

    const pushRecipients = await PushNotificationRepository.fetchUsersDeviceTokens(userId)

    let summery = {
      success: 0,
      failed: 0,
      failedPushes: [],
    }

    for(const pushRecipient of pushRecipients) {
      switch (pushRecipient.deviceType) {
        case DeviceTypesEnum.apple:
          try {
            await PushNotificationService.dispatchOneSignalApplePushNotification(pushRecipient.token, payload)

            summery.success++
          } catch (err) {
            summery.failed++

            summery.failedPushes.push({
              recipient: pushRecipient,
              reason: err.message
            })
          }
      }
    }

    return summery
  }

  static dispatchOneSignalApplePushNotification(token, {heading, content, subtitle, data}) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${configs.oneSignalApiKey}`
      }

      const options = {
        host: 'onesignal.com',
        port: 443,
        path: '/api/v1/notifications',
        method: 'POST',
        headers
      }

      // visit for more info: https://documentation.onesignal.com/reference#section-example-code-create-notification
      let message = {
        app_id: configs.oneSignalAppKey,
        include_player_ids: [token],
      }

      if (data) {
        message = Object.assign({
          data
        }, message)
      }

      if (heading) {
        message = Object.assign({
          headings: {'en': heading}
        }, message)
      }

      if (subtitle) {
        message = Object.assign({
          subtitle: {'en': subtitle}
        }, message)
      }

      if (content) {
        message = Object.assign({
          contents: {'en': content}
        }, message)
      }

      const req = https.request(options, (data) => {
        try {
          resolve(JSON.parse(data))
        } catch (err) {
          resolve(data)
        }
      })

      req.on('error', reject)

      req.write(JSON.stringify(message))
      req.end()
    })
  }
};

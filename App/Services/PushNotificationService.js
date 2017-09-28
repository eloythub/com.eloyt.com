'use strict'

import debug from 'debug'
import configs from '../../Configs'
import DeviceTypesEnum from '../Enums/DeviceTypesEnum'
import PushNotificationRepository from '../Repositories/PushNotificationRepository'
import azure from 'azure'

const azureNotificationHubService = azure.createNotificationHubService(
  configs.azurePushNotificationHubName,
  configs.azurePushNotificationAccessSignature
);

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
            await PushNotificationService.dispatchAzureApplePushNotification(pushRecipients.token, payload)

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

  static dispatchAzureApplePushNotification(token, payload) {
    return new Promise((resolve, reject) => {
      azureNotificationHubService.apns.send(token, payload, function(err){
        if(!err) {
          return resolve()
        }

        reject()
      });
    })
  }
};

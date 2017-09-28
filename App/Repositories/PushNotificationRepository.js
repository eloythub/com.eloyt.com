'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

export default class PushNotificationRepository {
  static async registerNewToken (userId, deviceType, token) {
    const log = debug(`${configs.debugZone}:PushNotificationRepository:registerNewToken`)

    log('registerNewToken')

    let pushTokenRegistry = await Models.PushTokensRegistry.create({
      userId,
      deviceType,
      token,
    })

    if (!pushTokenRegistry) {
      return null
    }

    return pushTokenRegistry
  }

  static async isTokenExists (userId, deviceType, token) {
    const log = debug(`${configs.debugZone}:PushNotificationRepository:isTokenExists`)

    log('isTokenExists')

    let pushTokenRegistry = await Models.PushTokensRegistry.findOne({
      where: {
        userId,
        deviceType,
        token,
      }
    })

    return !!pushTokenRegistry
  }

  static async fetchUsersDeviceTokens (userId) {
    const log = debug(`${configs.debugZone}:PushNotificationRepository:isTokenExists`)

    log('isTokenExists')

    let pushTokens = await Models.PushTokensRegistry.findAll({
      attributes: ['deviceType', 'token'],
      where: {
        userId
      }
    })

    if (!pushTokens) {
      return null
    }

    let pushTokensList = []

    for (const pushToken of pushTokens) {
      pushTokensList.push(pushToken.dataValues)
    }

    return pushTokensList
  }
};

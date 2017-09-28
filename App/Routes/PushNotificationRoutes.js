'use strict'

import DeviceTypesEnum from '../Enums/DeviceTypesEnum'
import PushNotificationController from '../Controllers/PushNotificationController'
import * as Joi from 'joi'

export default class MessagesRoutes {
  static setRoutes (router) {
    router.addRoute({
      method: 'POST',
      path: `/push-notification/token/register`,
      config: {
        auth: 'token',
        handler: (req, res) => PushNotificationController.registerNewDevice(req, res),
        validate: {
          payload: {
            userId: Joi.string().required(),
            token: Joi.string().required(),
            deviceType: Joi.string().allow([
              DeviceTypesEnum.apple,
              DeviceTypesEnum.android,
              DeviceTypesEnum.windows,
              DeviceTypesEnum.web
            ]).required(),
          }
        }
      }
    })
  }
};

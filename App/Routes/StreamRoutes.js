'use strict'

import StreamController from '../Controllers/StreamController'
import * as Joi from 'joi'

export default class StreamRoutes {
  static setRoutes (router) {
    router.addRoute({
      method: 'POST',
      path: `/stream/react/like`,
      config: {
        handler: (req, res) => StreamController.reactLikeToSnap(req, res),
        validate: {
          payload: {
            senderUserId: Joi.string().required(),
            receiverUserId: Joi.string().required(),
            resourceId: Joi.string().required()
          }
        }
      }
    })
  }
};

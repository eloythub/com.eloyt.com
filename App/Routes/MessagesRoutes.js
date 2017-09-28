'use strict'

import MessagesController from '../Controllers/MessagesController'
import * as Joi from 'joi'

export default class MessagesRoutes {
  static setRoutes (router) {
    router.addRoute({
      method: 'POST',
      path: `/messages/send`,
      config: {
        handler: (req, res) => MessagesController.sendMessage(req, res),
        validate: {
          payload: {
            senderUserId: Joi.string().required(),
            receiverUserId: Joi.string().required(),
            messageObject: Joi.object().required()
          }
        }
      }
    })
  }
};

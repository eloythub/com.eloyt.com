'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

export default class SocketRepository {
  static async updateSocketUserId (socketId, userId) {
    const log = debug(`${configs.debugZone}:SocketRepository`)

    log('updateSocketUserId')

    let user = await Models.Sockets.update({
      userId
    }, {
      where: { socketId }
    })

    if (!user) {
      return null
    }

    return user[0] > 0
  }

  static async newSocketRegisteration (socketId) {
    const log = debug(`${configs.debugZone}:SocketRepository`)

    log('newSocketRegisteration')

    let socket = await Models.Sockets.create({
      socketId,
      userId: null,
      viewPoint: null
    })

    if (!socket) {
      return null
    }

    return socket
  }

  static async removeRegisteredSocket (socketId) {
    const log = debug(`${configs.debugZone}:SocketRepository`)

    log('removeRegisteredSocket')

    const socket = await Models.Sockets.destroy({where: {socketId}})

    return socket
  }
};

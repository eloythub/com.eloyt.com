'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

export default class SocketRepository {
  static async newSocketRegisteration (socketId) {
    const log = debug(`${configs.debugZone}:SocketRepository:newSocketRegisteration`)

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
    const log = debug(`${configs.debugZone}:SocketRepository:removeRegisteredSocket`)

    log('removeRegisteredSocket')

    const socket = await Models.Sockets.destroy({where: {socketId}})

    return socket
  }
};

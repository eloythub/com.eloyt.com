'use strict'

import debug from 'debug'
import configs from '../../Configs'
import SocketRepository from '../Repositories/SocketRepository'

export default class SocketService {
  static async newSocketRegisteration (socketId) {
    const log = debug(`${configs.debugZone}:SocketService:newSocketRegisteration`)

    log('newSocketRegisteration')

    let socket = await SocketRepository.newSocketRegisteration(socketId)

    return socket
  }

  static async removeRegisteredSocket (socketId) {
    const log = debug(`${configs.debugZone}:SocketService:removeRegisteredSocket`)

    log('removeRegisteredSocket')

    let socket = await SocketRepository.removeRegisteredSocket(socketId)

    return socket
  }

  static async updateSocketUserId (socketId, userId) {
    const log = debug(`${configs.debugZone}:SocketService`)

    log('updateSocketUserId')

    let socket = await SocketRepository.updateSocketUserId(socketId, userId)

    return socket
  }
};

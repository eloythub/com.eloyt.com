'use strict'

import debug from 'debug'
import configs from '../../Configs'
import SocketRepository from '../Repositories/SocketRepository'
import SocketEmitterWrapper from '../Sockets/SocketEmitterWrapper'

const log = debug(`${configs.debugZone}:SocketService`)

export default class SocketService {
  static async newSocketRegisteration (socketId) {
    log('newSocketRegisteration')

    let socket = await SocketRepository.newSocketRegisteration(socketId)

    return socket
  }

  static async removeRegisteredSocket (socketId) {
    log('removeRegisteredSocket')

    let socket = await SocketRepository.removeRegisteredSocket(socketId)

    return socket
  }

  static async updateSocketUserId (socketId, userId) {
    log('updateSocketUserId')

    let socket = await SocketRepository.updateSocketUserId(socketId, userId)

    return socket
  }

  static async emitSocket (userId, event, payload = {}) {
    log('emitSocket')

    const socketEmitterWrapper = new SocketEmitterWrapper

    const socketIdsList = await SocketRepository.fetchUsersSocketId(userId)

    for (const socket of socketIdsList) {
      try {
        await socketEmitterWrapper.emit(socket.socketId, event, payload)

      } catch (err) {
      }
    }
  }
};

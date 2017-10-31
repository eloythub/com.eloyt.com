'use strict'

import debug from 'debug'
import configs from '../../Configs'

const log = debug(`${configs.debugZone}:SocketEmitterWrapper`)

export default class SocketEmitterWrapper {
  namespace = '/'

  constructor () {
    this.ioEmitter = global.ioEmitter
  }

  emit (socketId, event, payload) {
    log('emit', socketId, event)

    this.ioEmitter.of('/').to(socketId).emit(event, payload)
  }
}

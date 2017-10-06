'use strict'

export default class SocketWrapper {
  namespace = '/'

  constructor () {
    this.io = global.io
  }

  getNamespace() {
    return this.io.nsps[this.namespace]
  }

  /**
   * is socket connected
   *
   * @param socketIo
   * @param namespace
   * @returns {boolean}
   */
  isSocketConnected (...args) {
    const [socketId, namespace = this.getNamespace()] = args

    return namespace.connected.hasOwnProperty(socketId)
  }

  /**
   * get connected socket object
   *
   * @param socketIo
   * @param namespace
   * @returns {null} | Socket
   */
  getSocket (...args) {
    const [socketId, namespace = this.getNamespace()] = args

    if (!this.isSocketConnected(socketId, namespace)) {
      return null
    }

    return namespace.connected[socketId]
  }

  /**
   * get connected socket object
   *
   * @param socketIo
   * @param event
   * @param data
   * @param namespace
   * @returns {null} | Socket
   */
  emit (...args) {
    const [socketId, event, data, namespace = this.getNamespace()] = args

    if (!this.isSocketConnected(socketId, namespace)) {
      return null
    }

    const socket = this.getSocket(socketId, namespace)

    return socket.emit(event, data)
  }
}

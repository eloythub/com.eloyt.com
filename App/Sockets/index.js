'use strict'

import SocketService from '../Services/SocketService'

export default class Sockets {
  constructor (io, socket) {
    this.io = io
    this.socket = socket

    this.newConnection()

    // device will return by it's socket information
    socket.on('auth-pong', this.authPong.bind(this))

    // device get's disconnected
    socket.on('disconnect', this.disconnect.bind(this))
  }

  async newConnection () {
    console.log('received a new Connection: ', this.socket.id)

    // register new socket into DB
    const socket = await SocketService.newSocketRegisteration(this.socket.id)

    // ask device to introduce itself
    this.socket.emit('auth-ping')
  }

  authPong (data) {
    console.log('socket introduce itself by following data : ', data)

    this.socket.emit('auth-green-light')
  }

  async disconnect () {
    console.log('socket lost', this.socket.id)
    // remove registered socket
    const socket = await SocketService.removeRegisteredSocket(this.socket.id)
  }
}

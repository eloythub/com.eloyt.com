'use strict'

import SocketService from '../Services/SocketService'
import AuthRepository from '../Repositories/AuthRepository'

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

  async authPong (data) {
    console.log('socket introduce itself by following data : ', data)

    const {authorizationToken} = data

    const auth = await AuthRepository.fetchAuthTokenById(authorizationToken)

    const updatedSocket = await SocketService.updateSocketUserId(this.socket.id, auth.userId)

    if (updatedSocket) {
      return this.socket.emit('auth-green-light')
    }

    this.socket.emit('auth-red-light')
  }

  async disconnect () {
    console.log('socket lost', this.socket.id)
    // remove registered socket
    const socket = await SocketService.removeRegisteredSocket(this.socket.id)
  }
}


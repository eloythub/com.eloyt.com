'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

const log = debug(`${configs.debugZone}:SocketRepository`)

export default class SocketRepository {
  static async fetchUsersSocketId (userId) {
    log('fetchUsersSocketId')

    let socketIds = await Models.Sockets.findAll({
      attributes: ['socketId'],
    }, {
      where: { userId }
    })

    if (!socketIds) {
      return null
    }

    let socketIdsList = []

    for (const socketId of socketIds) {
      socketIdsList.push(socketId.dataValues)
    }

    return socketIdsList
  }

  static async updateSocketUserId (socketId, userId) {
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
    log('removeRegisteredSocket')

    const socket = await Models.Sockets.destroy({where: {socketId}})

    return socket
  }
};

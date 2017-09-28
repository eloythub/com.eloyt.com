'use strict'

import debug from 'debug'
import configs from '../../Configs'
import AuthRepository from '../Repositories/AuthRepository'
import UsersRepository from '../Repositories/UsersRepository'

export default class UsersService {
  static async getUserByTokenId (tokenId) {
    const log = debug(`${configs.debugZone}:UsersService:getUserByTokenId`)

    log('getUserByTokenId')

    const authToken = await AuthRepository.fetchAuthTokenById(tokenId)

    if (!authToken) {
      return null
    }

    const user = await UsersRepository.fetchUserById(authToken.userId)

    return user
  }

  static async findUser (userId) {
    const log = debug(`${configs.debugZone}:UsersService:findUser`)

    log('findUser')

    let user = await UsersRepository.fetchUserById(userId)

    return user
  }
};

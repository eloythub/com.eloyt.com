'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

export default class AuthRepository {
  static async fetchAuthTokenById (id) {
    const log = debug(`${configs.debugZone}:AuthRepository:fetchAuthTokenById`)

    log('fetchAuthTokenById')

    const authToken = await Models.AuthTokens.findOne({where: {id}})

    if (!authToken) {
      return null
    }

    return authToken.dataValues
  }
}

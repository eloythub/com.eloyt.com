'use strict'

import debug from 'debug'
import configs from '../../Configs'
import amqp from 'amqplib/callback_api';

const log = debug(`${configs.debugZone}:RabbitMQService`)

export default class RabbitMQService {
  static channel

  static async publish (routes, data) {
    log('publish')

    const {exchangeName} = configs.rabbitMQ

    const channel = await this.getConnection()

    if (typeof routes === 'string') {
      routes = [routes]
    }

    if (typeof routes === 'object') {
      for (const route of routes) {
        channel.publish(exchangeName, route, new Buffer(JSON.stringify(data)))
      }
    }
  }

  static async getConnection () {
    log('getConnection')

    const {username, password, host, port, exchangeName} = configs.rabbitMQ

    return new Promise((resolve, reject) => {
      if (this.channel) {
        return resolve(this.channel)
      }

      const options = {
        port,
        protocol: 'amqp',
        hostname: host,
        vhost: '/',
        username,
        password
      }

      amqp.connect(options, (err, conn) => {
        if (err) {
          return reject(err)
        }

        conn.createChannel(async (err, channel) => {
          if (err) {
            return reject(err)
          }

          channel.assertExchange(exchangeName, 'topic', {durable: false})

          this.channel = channel

          resolve(this.channel)

        })
      })
    })
  }
};

import amqp from 'amqplib/callback_api';
import path from 'path';
import fs from 'fs';
import debug from 'debug';
import configs from '../Configs';
import RabbitMQService from '../App/Services/RabbitMQService';

const log = debug(`${configs.debugZone}:Consumer`);

export default class Consumer {
  static async launch () {
    log('launch')

    const {username, password, host, port, exchangeName} = configs.rabbitMQ

    const channel = await RabbitMQService.getConnection()

    this.loadConsumers(channel)
  }

  static loadConsumers (channel) {
    log('loadConsumers')

    const {exchangeName} = configs.rabbitMQ

    this.readDir(path.join(__dirname, 'Consumers'), (consumerFile) => {
      const consumerClass = require(consumerFile).default

      if (!consumerClass.enable) {
        return
      }

      channel.assertQueue(
        consumerClass.queueName,
        consumerClass.queueOptions,
        (err, q) => {
          channel.bindQueue(q.queue, exchangeName, consumerClass.routeName)

          channel.consume(
            q.queue,
            async (msg) => {
              let data = msg.content.toString()

              try {
                data = JSON.parse(data)
              } catch (err) {

              }

              await consumerClass.handle(data, msg)
            },
            {noAck: true}
          )

          log(`consumer "${consumerClass.routeName}" engaged`)
        })
    })
  }

  static readDir (dir, cb) {
    fs.lstatSync(dir).isDirectory()
      ? fs.readdirSync(dir).map(innerDir => this.readDir(path.join(dir, innerDir), cb))
      : cb(dir);
  }
}
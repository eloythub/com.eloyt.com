import Consumer from '../Consumer'

export default class SendPushNotification extends Consumer {
  static enable = false

  // Name of the queue in rabbitMQ
  static queueName = 'test_queue'

  // Name of the route in rabbitMQ
  static routeName = 'test_route'

  // queue options
  static queueOptions = {
    autoDelete: true,
    exclusive: true,
    // expires: <...>,
    // messageTtl: <...>,
    // deadLetterExchange: <...>,
    // maxLength: <...>,
    // maxPriority: <...>,
    // durable: <...>,
  }

  static handle (data, msg) {
    console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString())

  }
}
'use strict'

import HealthCheckRoutes from './Routes/HealthCheckRoutes'
import MessagesRoutes from './Routes/MessagesRoutes'
import PushNotificationRoutes from './Routes/PushNotificationRoutes'
import StreamRoutes from './Routes/StreamRoutes'

export default class Routes {
  constructor (router) {
    this.router = router

    HealthCheckRoutes.setRoutes(this.router)
    MessagesRoutes.setRoutes(this.router)
    PushNotificationRoutes.setRoutes(this.router)
    StreamRoutes.setRoutes(this.router)
  }
};

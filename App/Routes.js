'use strict'

import HealthCheckRoutes from './Routes/HealthCheckRoutes'
import MessagesRoutes from './Routes/MessagesRoutes'
import PushNotificationRoutes from './Routes/PushNotificationRoutes'

export default class Routes {
  constructor (router) {
    this.router = router

    HealthCheckRoutes.setRoutes(this.router)
    MessagesRoutes.setRoutes(this.router)
    PushNotificationRoutes.setRoutes(this.router)
  }
};

'use strict';

import Hapi from 'hapi';
import * as Models from './App/Models'; // please don't remove this line, it initiate the db connection
import debug from 'debug';
import SocketIO from 'socket.io';
import redis from 'socket.io-redis';
import configs from './Configs';
import Sockets from './App/Sockets';
import Router from './Router';
import Routes from './App/Routes';
import Schemas from './App/Schemas';

export default class Server {
  constructor() {
    this.server = new Hapi.Server();

    // server connection config
    this.server.connection({port: configs.exposePort || 80});

    Schemas.authentication(this.server);

    // router setup
    const router = new Router();

    // handle the routes
    new Routes(router);

    this.server.route(router.getRoutes());
  }

  fireUp() {
    const log = debug(`${configs.debugZone}:fireUp`);

    if (configs.nodeEnv === 'test') {
      log(`Start running at: ${this.server.info.uri}`);

      return this.server.listener;
    }

    this.io = SocketIO(this.server.listener, {
      transports: ['websocket']
    })

    // use redis on sockets in order to handle the horizontal scaling
    this.io.adapter(redis({ host: configs.redisHost, port: configs.redisPort }));

    // maintain the socket.io connection
    this.io.on('connect', (socket) => new Sockets(this.io, socket))

    this.server.start((err) => {
      if (err) {
        throw err;
      }

      log(`Start running HAPI.JS at: ${this.server.info.uri}`);
      log(`Start running SOCKET.IO at: ${this.server.info.uri}/socket.io/`);
    });
  }
};

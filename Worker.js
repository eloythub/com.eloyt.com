import debug from 'debug';
import configs from './Configs';
import Consumer from './App/Consumer';

const log = debug(`${configs.debugZone}:Worker`);

export default class Worker {
  fireUp () {
    log('fireUp')

    Consumer.launch()
  }
}

const worker = new Worker()

worker.fireUp()
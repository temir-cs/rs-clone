/* eslint-disable no-useless-constructor */
import Phaser from 'phaser';

class EventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}

export default new EventEmitter();

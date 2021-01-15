import * as Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../../assets/json/01_forest_map.json');
    this.load.image('tiles-1', '../../../assets/img/01_forest_platforms.png');
    this.load.image('tiles-2', '../../../assets/img/01_forest_env.png');
    this.load.image('fireball', '../../../assets/img/weapons/fire4.png');

    this.load.spritesheet('player', '../../../assets/img/player01/knight-all-moves.png', {
      // frameWidth: 73, frameHeight: 81,
      frameWidth: 65.2, frameHeight: 81,
    });
    this.load.spritesheet('troll', 'src/assets/img/enemies/goblin_idle_walk.png', {
      // frameWidth: 73, frameHeight: 81,
      frameWidth: 56, frameHeight: 128, spacing: 72
    });
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default Preload;

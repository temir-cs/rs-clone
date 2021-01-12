import * as Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../../assets/json/01_forest_map.json');
    this.load.image('tiles-1', '../../../assets/img/01_forest_platforms.png');
    this.load.image('tiles-2', '../../../assets/img/01_forest_env.png');
    // this.load.image('player', '../../../assets/img/player01/idle02.png');

    // this.load.spritesheet('player', '../../../assets/img/player01/knight-run.png', {
    //   frameWidth: 64, frameHeight: 64, spacing: 3
    // });

    this.load.spritesheet('player', '../../../assets/img/player01/knight-all-moves.png', {
      // frameWidth: 73, frameHeight: 81,
      frameWidth: 65, frameHeight: 81,
    });
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default Preload;

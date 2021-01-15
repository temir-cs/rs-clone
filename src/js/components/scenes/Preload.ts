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

    // Menu items
    this.load.image('menu-bg', '../../../assets/img/menu-bg.jpg');

    this.load.multiatlas('knight', '../../../assets/json/heroes/knightSprite.json', '../../../assets/img/heroes');
    this.load.multiatlas('troll', '../../../assets/json/enemies/enemyGoblinSprite.json', '../../../assets/img/enemies');
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default Preload;

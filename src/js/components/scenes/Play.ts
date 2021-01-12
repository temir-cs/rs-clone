import * as Phaser from 'phaser';
import Player from '../entities/Player';

class Play extends Phaser.Scene {
  config: Phaser.Types.Core.GameConfig;
  cursors: any;
  playerSpeed: number;
  map: Phaser.Tilemaps.Tilemap = null;

  // player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
  player: any;

  layers: {
    environmentTop: Phaser.Tilemaps.TilemapLayer,
    platformColliders: Phaser.Tilemaps.TilemapLayer,
    environmentBottom: Phaser.Tilemaps.TilemapLayer,
    platforms: Phaser.Tilemaps.TilemapLayer,
  } = {
    platformColliders: null,
    environmentTop: null,
    environmentBottom: null,
    platforms: null,
  };

  constructor(config: Phaser.Types.Core.GameConfig) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    this.createMap();
    this.createLayers();

    const player = this.createPlayer();
    this.physics.add.collider(player, this.layers.platformColliders);
    // this.player = this.createPlayer();
    // this.playerSpeed = 200;
    // this.physics.add.collider(this.player, this.layers.platformColliders);
    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'map' });
    this.map.addTilesetImage('01_forest_platforms', 'tiles-1');
    this.map.addTilesetImage('01_forest_env', 'tiles-2');
  }

  createLayers() {
    const tileset1 = this.map.getTileset('01_forest_platforms');
    const tileset2 = this.map.getTileset('01_forest_env');
    this.layers.platformColliders = this.map.createLayer('platform_colliders', tileset1);
    this.layers.platformColliders.setCollisionByProperty({ collides: true });
    this.layers.platformColliders.setAlpha(0);
    this.layers.environmentBottom = this.map.createLayer('environment_bottom', tileset2);
    this.layers.platforms = this.map.createLayer('platforms', tileset1);
    this.layers.environmentTop = this.map.createLayer('environment_top', tileset2);
  }

  createPlayer() {
    // this.player = this.physics.add.sprite(100, 200, 'player');
    // this.player.body.setGravityY(500);
    // this.player.setCollideWorldBounds(true);

    // const player = new Player(this, 100, 250);
    // player.setGravityY(500);
    // player.setCollideWorldBounds(true);
    // return player;

    return new Player(this, 100, 250);
  }

  // update() {
  //     const { left, right } = this.cursors;

  //     if (left.isDown) {
  //       this.player.setVelocityX(-this.playerSpeed);
  //     } else if (right.isDown) {
  //       this.player.setVelocityX(this.playerSpeed);
  //     } else {
  //       this.player.setVelocityX(0);
  //     }
  // }
}

export default Play;

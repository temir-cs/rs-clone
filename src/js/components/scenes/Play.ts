import * as Phaser from 'phaser';
import Player from '../entities/Player';

// type newPlayer = Player & {addcollider: () => void};
class Play extends Phaser.Scene {
  config: any;
  map: Phaser.Tilemaps.Tilemap = null;
  // player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
  player: Phaser.Physics.Arcade.Sprite;

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

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }
  // constructor(config) {
  //   super('PlayScene');
  //   this.config = config;
  // }

  create() {
    this.createMap();
    this.createLayers();

    const player = this.createPlayer();

    // player.addCollider(this.layers.platformColliders);
    this.createPlayerColliders(player, {
      colliders: {
      platformColliders: this.layers.platformColliders
      }
    });

    this.setupFollowupCameraOn(player);
  }

  createMap():void {
    this.map = this.make.tilemap({ key: 'map' });
    this.map.addTilesetImage('01_forest_platforms', 'tiles-1');
    this.map.addTilesetImage('01_forest_env', 'tiles-2');
  }

  createLayers():void {
    const tileset1 = this.map.getTileset('01_forest_platforms');
    const tileset2 = this.map.getTileset('01_forest_env');
    this.layers.platformColliders = this.map.createLayer('platform_colliders', tileset1);
    this.layers.platformColliders.setCollisionByProperty({ collides: true });
    this.layers.platformColliders.setAlpha(0);
    this.layers.environmentBottom = this.map.createLayer('environment_bottom', tileset2);
    this.layers.platforms = this.map.createLayer('platforms', tileset1);
    this.layers.environmentTop = this.map.createLayer('environment_top', tileset2);
  }

  createPlayer():Phaser.Physics.Arcade.Sprite {
    return new Player(this, 100, 250);
  }

  createPlayerColliders(player, { colliders }):void {
    console.log(this);
    player.addCollider(colliders.platformColliders);
  }

  setupFollowupCameraOn(player):void {
    const { height, width, mapOffset, heightOffset, zoomFactor } = this.config;

    this.physics.world.setBounds(0, -200, width + mapOffset, height + heightOffset + 400);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height + heightOffset).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }
}

export default Play;

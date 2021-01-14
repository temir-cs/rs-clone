import * as Phaser from 'phaser';

import Player from '../entities/Player';

import Enemies from '../groups/Enemies';

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
    playerZones: Phaser.Tilemaps.ObjectLayer,
    enemySpawns: Phaser.Tilemaps.ObjectLayer,
  } = {
    platformColliders: null,
    environmentTop: null,
    environmentBottom: null,
    platforms: null,
    playerZones: null,
    enemySpawns: null,
  };

  private plotting: boolean;
  private graphics: Phaser.GameObjects.Graphics;
  private line: Phaser.Geom.Line;
  private tileHits: any;

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    this.createMap();
    this.createLayers();
    const playerZones = this.getPlayerZones();
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(this.layers.enemySpawns, this.layers.platformColliders);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: this.layers.platformColliders,
        player
      }
    });
    this.createPlayerColliders(player, {
      colliders: {
      platformColliders: this.layers.platformColliders
      }
    });
    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player);
  }

  stopDrawing(pointer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;
    this.graphics.clear();

    this.graphics.strokeLineShape(this.line);

    this.tileHits = this.layers.platforms.getTilesWithinShape(this.line);

    if (this.tileHits && this.tileHits.length > 0) {
      this.tileHits.forEach((tile) => {
        tile.index !== -1 && tile.setCollision(true);
      });
    }

    this.plotting = false;
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
    this.layers.playerZones = this.map.getObjectLayer('player_zones');
    this.layers.enemySpawns = this.map.getObjectLayer('enemy_spawns');
  }

  createPlayer(start):Phaser.Physics.Arcade.Sprite {
    return new Player(this, start.x, start.y);
  }

  createEnemies(enemySpawnsLayer, collider) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    const enemySpawns = enemySpawnsLayer.objects;
    enemySpawns.forEach((spawn) => {
        const enemy = new enemyTypes[spawn.type](this, spawn.x, spawn.y);
        enemy.setColliders(collider);
        enemies.add(enemy);
    });
    return enemies;
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  createEnemyColliders(enemies, { colliders }):void {
    enemies
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.player, this.onPlayerCollision);
  }

  createPlayerColliders(player, { colliders }):void {
    player.addCollider(colliders.platformColliders);
  }

  setupFollowupCameraOn(player):void {
    const { height, width, mapOffset, heightOffset, zoomFactor } = this.config;

    this.physics.world.setBounds(0, -100, width + mapOffset, height + heightOffset + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height + heightOffset).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones() {
    const zones = this.layers.playerZones.objects;
    return {
      start: zones[0],
      end: zones[1],
    };
  }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setSize(5, 100);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;
      console.log('You Won!!');
    });
  }
}

export default Play;

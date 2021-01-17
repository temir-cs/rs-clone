import * as Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';
import EventEmitter from '../events/Emitter';
import effectAnims from '../animations/effectsAnim';
import Collectables from '../groups/Collectables';
import ScoreBoard from '../hud/ScoreBoard';

// type newPlayer = Player & {addcollider: () => void};
class Play extends Phaser.Scene {
  config: any;
  map: Phaser.Tilemaps.Tilemap = null;
  // player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
  player: Phaser.Physics.Arcade.Sprite;

  layers: {
    environmentTop: Phaser.Tilemaps.TilemapLayer,
    enemiesPlatformColliders: Phaser.Tilemaps.TilemapLayer,
    platformColliders: Phaser.Tilemaps.TilemapLayer,
    environmentBottom: Phaser.Tilemaps.TilemapLayer,
    platforms: Phaser.Tilemaps.TilemapLayer,
    playerZones: Phaser.Tilemaps.ObjectLayer,
    enemySpawns: Phaser.Tilemaps.ObjectLayer,
    collectables: Phaser.Tilemaps.ObjectLayer,
  } = {
    platformColliders: null,
    enemiesPlatformColliders: null,
    environmentTop: null,
    environmentBottom: null,
    platforms: null,
    playerZones: null,
    enemySpawns: null,
    collectables: null,
  };

  private plotting: boolean;
  private graphics: Phaser.GameObjects.Graphics;
  private line: Phaser.Geom.Line;
  private tileHits: any;
  private treesImg: any;
  private cloudsImg: any;
  private mountainsImg: any;
  private collectables: any;
  private score: number;
  private scoreBoard: any

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({ gameStatus }):void {
    // this.playBgMusic();
    this.score = 0;
    this.createMap();
    effectAnims(this.anims);
    this.createLayers();
    const playerZones = this.getPlayerZones();
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(this.layers.enemySpawns, this.layers.enemiesPlatformColliders);
    this.createCollectables(this.layers.collectables);

    this.createBg();
    this.scoreBoard = new ScoreBoard(this);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: this.layers.enemiesPlatformColliders,
        player
      }
    });
    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: this.layers.platformColliders,
        collectables: this.collectables,
      }
    });

    this.createEndOfLevel(playerZones.end, player);
    this.createBackButton();
    this.setupFollowupCameraOn(player);

    if (gameStatus === 'PLAYER_LOSE') return;
    this.createGameEvents();
  }

  createCollectables(collectableLayer: Phaser.Tilemaps.ObjectLayer):void {
    this.collectables = new Collectables(this).setDepth(-1);
    this.collectables.addFromLayer(collectableLayer);
    this.collectables.playAnimation('coin');
  }

  playBgMusic():void {
    if (this.sound.get('forest-theme')) return;
    this.sound.add('forest-theme', { loop: true, volume: 0.02 })
      .play();
  }

  createMap():void {
    this.map = this.make.tilemap({ key: 'map' });
    this.map.addTilesetImage('01_forest_platforms', 'tiles-1');
    this.map.addTilesetImage('01_forest_env', 'tiles-2');
    this.map.addTilesetImage('green-tile', 'bg-forest-tileset');
  }

  createLayers():void {
    const tileset1 = this.map.getTileset('01_forest_platforms');
    const tileset2 = this.map.getTileset('01_forest_env');
    const tilesetBg = this.map.getTileset('green-tile');

    this.map.createLayer('distance', tilesetBg);

    this.layers.platformColliders = this.map.createLayer('platform_colliders', tileset1);
    this.layers.platformColliders.setCollisionByProperty({ collides: true });
    this.layers.platformColliders.setAlpha(0);
    this.layers.enemiesPlatformColliders = this.map.createLayer('enemies_colliders', tileset1);
    this.layers.enemiesPlatformColliders.setCollisionByProperty({ collides: true });
    this.layers.enemiesPlatformColliders.setAlpha(0);
    this.layers.environmentBottom = this.map.createLayer('environment_bottom', tileset2);
    this.layers.platforms = this.map.createLayer('platforms', tileset1);
    this.layers.environmentTop = this.map.createLayer('environment_top', tileset2);
    this.layers.playerZones = this.map.getObjectLayer('player_zones');
    this.layers.enemySpawns = this.map.getObjectLayer('enemy_spawns');
    this.layers.collectables = this.map.getObjectLayer('collectables');
  }

  createBg() {
    const bgObject = this.map.getObjectLayer('distance_bg').objects[0];
    this.treesImg = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-forest-trees')
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    this.mountainsImg = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-forest-mountains')
      .setOrigin(0, 1)
      .setDepth(-11)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-forest-clouds-1')
      .setOrigin(0, 1)
      .setDepth(-12)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-forest-clouds-2')
      .setOrigin(0, 1)
      .setDepth(-13)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    this.cloudsImg = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-forest-clouds-small')
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    this.add.tileSprite(0, 0, this.config.width, bgObject.height, 'bg-forest-sky')
      .setOrigin(0, 0)
      .setDepth(-14)
      .setScale(1.2)
      .setScrollFactor(0, 1);
  }

  createGameEvents() {
    EventEmitter.on('PLAYER_LOSE', () => {
      this.scene.restart({ gameStatus: 'PLAYER_LOSE' });
    });
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

  onPlayerCollision(enemy, player):void {
    player.takesHit(enemy);
  }

  onWeaponHit(entity, source):void {
    entity.takesHit(source);
  }

  createEnemyColliders(enemies, { colliders }):void {
    enemies
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onWeaponHit)
      .addOverlap(colliders.player.meleeWeapon, this.onWeaponHit);
  }

  onCollect(entity, collectable) {
    this.score += collectable.score;
    collectable.coinPickupSound.play();
    this.scoreBoard.updateScoreBoard(this.score);
    collectable.disableBody(true, true);
  }

  createPlayerColliders(player, { colliders }):void {
    player
      .addCollider(colliders.platformColliders)
      .addOverlap(colliders.collectables, this.onCollect, this);
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

  createBackButton():void {
    const menuButton = this.add.image(this.config.rightBottomCorner.x - 10, this.config.rightBottomCorner.y - 10, 'home')
      .setOrigin(1, 1)
      .setScrollFactor(0)
      .setScale(1)
      .setInteractive();

    menuButton.on('pointerup', () => {
      this.scene.start('MenuScene');
    });

    menuButton.on('pointerover', () => {
      menuButton.setTint(0x0FFF00);
    });

    menuButton.on('pointerout', () => {
      menuButton.clearTint();
    });
  }

  update():void {
    this.treesImg.tilePositionX = this.cameras.main.scrollX * 0.2;
    this.mountainsImg.tilePositionX = this.cameras.main.scrollX * 0.15;
    this.cloudsImg.tilePositionX = this.cameras.main.scrollX * 0.1;
  }
}

export default Play;

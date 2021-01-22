/* eslint-disable class-methods-use-this */
import * as Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';
import EventEmitter from '../events/Emitter';
import effectAnims from '../animations/effectsAnim';
import Collectables from '../groups/Collectables';
import Key from '../collectables/Key';
import Hud from '../hud/Hud';
import Door from '../helper_objects/Door';
import { createMapCastle, createLayersCastle, createBgCastle, bgParallaxCastle } from './levels_utils/castleUtils';
import { createMapForest,
        createLayersForest,
        createBgForest,
        bgParallaxForest } from './levels_utils/forestUtils';

const DEFAULT_LEVEL = 1;
const LIVES = 3;
const DEFAULT_STATS = {
  coins: 0,
  kills: 0,
};

// type newPlayer = Player & {addcollider: () => void};
class Play extends Phaser.Scene {
  config: any;
  map: Phaser.Tilemaps.Tilemap = null;
  player: Phaser.Physics.Arcade.Sprite;

  layers: {
    environmentTop: Phaser.Tilemaps.TilemapLayer,
    enemiesPlatformColliders: Phaser.Tilemaps.TilemapLayer,
    platformColliders: Phaser.Tilemaps.TilemapLayer,
    environmentBottom: Phaser.Tilemaps.TilemapLayer,
    castleWall: Phaser.Tilemaps.TilemapLayer,
    platforms: Phaser.Tilemaps.TilemapLayer,
    playerZones: Phaser.Tilemaps.ObjectLayer,
    enemySpawns: Phaser.Tilemaps.ObjectLayer,
    collectables: Phaser.Tilemaps.ObjectLayer,
    collectableKey: Phaser.Tilemaps.ObjectLayer,
  } = {
    platformColliders: null,
    enemiesPlatformColliders: null,
    environmentTop: null,
    environmentBottom: null,
    castleWall: null,
    platforms: null,
    playerZones: null,
    enemySpawns: null,
    collectables: null,
    collectableKey: null,
  };

  private plotting: boolean;
  private graphics: Phaser.GameObjects.Graphics;
  private line: Phaser.Geom.Line;
  private tileHits: any;
  private bkgForest: any;
  private bkgClouds: any;
  private bkgMountains: any;
  private collectables: any;
  private coinCount: number;
  private hud: any;
  private collectableKey: any;
  private hasKey: boolean;

  lvlKey: string;
  private createMap: any;
  private createLayers: any;
  private createBg: any;
  private bgParallax: any;
  killCount: number;
  livesCount: number;
  stats: any;

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({ gameStatus }):void {
    this.cameras.main.fadeIn(3000);
    this.checkLevel();
    this.hasKey = false;
    console.log('Gamestatus: ', gameStatus);
    this.livesCount = this.registry.get('livesCount') || LIVES;
    this.stats = this.getCurrentStats();
    console.log('coinCount', this.stats.coins);
    console.log('killCount', this.stats.kills);
    console.log('livesCount', this.livesCount);
    this.createMap(this);
    effectAnims(this.anims);
    this.createLayers(this);
    const playerZones = this.getPlayerZones();
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(this.layers.enemySpawns, this.layers.enemiesPlatformColliders);
    this.createCollectables(this.layers.collectables);
    this.createKeyCollectable(this.layers.collectableKey);
    console.log('Current hero: ', player.hero);

    this.createBg(this);
    this.hud = new Hud(this);
    // this.BoardForKey = new BoardForKey(this);
    this.hud.renderAvatar(player.hero);
    this.hud.renderLives(this.livesCount);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: this.layers.enemiesPlatformColliders,
        player
      }
    });
    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: this.layers.platformColliders,
        projectiles: enemies.getProjectiles(),
        collectables: this.collectables,
        collectableKey: this.collectableKey,
      }
    });

    this.createEndOfLevel(playerZones.end, player);
    this.createBackButton();
    this.setupFollowupCameraOn(player);

    if (gameStatus === 'PLAYER_LOSE' || gameStatus === 'LEVEL_COMPLETED') return;
    this.createGameEvents();
  }

  update():void {
    this.bgParallax(this);
  }

  checkLevel() {
    if (this.getCurrentLevel() === 1) {
      this.lvlKey = 'forest';
      this.createLayers = createLayersForest;
      this.createBg = createBgForest;
      this.bgParallax = bgParallaxForest;
      this.createMap = createMapForest;
    } else if (this.getCurrentLevel() === 2) {
      this.lvlKey = 'castle';
      this.createLayers = createLayersCastle;
      this.createBg = createBgCastle;
      this.bgParallax = bgParallaxCastle;
      this.createMap = createMapCastle;
    }
  }

  createKeyCollectable(layer):void {
    layer.objects.forEach((obj) => {
      this.collectableKey = new Key(this, obj.x, obj.y);
    });
    this.physics.add.existing(this.collectableKey);
  }

  createCollectables(collectableLayer: Phaser.Tilemaps.ObjectLayer):void {
    this.collectables = new Collectables(this).setDepth(-1);
    this.collectables.addFromLayer(collectableLayer);
  }

  playBgMusic():void {
    if (this.sound.get('forest-theme')) return;
    this.sound.add('forest-theme', { loop: true, volume: 0.02 })
      .play();
  }

  createGameEvents() {
    EventEmitter.on('PLAYER_LOSE', () => {
      this.livesCount -= 1;
      this.registry.set('livesCount', this.livesCount);
      this.scene.restart({ gameStatus: 'PLAYER_LOSE' });
      if (this.livesCount === 0) {
        this.scene.start('GameOverScene');
        const finalStats = this.getCurrentStats();
        this.registry.set('finalStats', { ...finalStats });
        this.registry.set('level', DEFAULT_LEVEL);
      }

      const currentLvl = this.getCurrentLevel();

      console.log('CurrentLevel: ', currentLvl);
      if (currentLvl > 1) {
        const lastLevelStats = this.registry.get('lastLevelStats');
        console.log('lastLevelStats :', lastLevelStats);
        this.registry.set('stats', { ...lastLevelStats });
      } else {
        this.registry.set('stats', { ...DEFAULT_STATS });
      }
    });

    EventEmitter.on('ENEMY_KILLED', () => {
      this.stats.kills += 1;
      this.registry.set('stats', { ...this.stats });
      console.log('Kills: ', this.registry.get('stats').kills);
    });
  }

  createPlayer(start):Player {
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
    this.stats.coins += collectable.score;
    this.registry.set('stats', { ...this.stats });
    collectable.pickupSound.play();
    this.hud.updateScoreBoard(this.stats.coins);
    collectable.disableBody(true, true);
    console.log('Coins: ', this.getCurrentStats().coins);
  }

  onKeyCollect() {
    this.collectableKey.pickupSound.play();
    this.collectableKey.disableBody(true, true);
    this.hasKey = true;
    this.hud.activateKey();
  }

  createPlayerColliders(player, { colliders }):void {
    player
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.projectiles, this.onWeaponHit)
      .addOverlap(colliders.collectables, this.onCollect, this)
      .addOverlap(colliders.collectables, this.onCollect, this)
      .addOverlap(colliders.collectableKey, this.onKeyCollect, this);
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

  getCurrentLevel() {
    return this.registry.get('level') || DEFAULT_LEVEL;
  }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setSize(5, 100);

    const door = new Door(this, end.x, end.y - 30, this.lvlKey).setDepth(-1);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      if (this.hasKey) {
        eolOverlap.active = false;
        door.openDoor();
        console.log('You Won!!');
        this.registry.inc('level', 1);
        this.cameras.main.fadeOut(3000);
        setTimeout(() => this.scene.restart({ gameStatus: 'LEVEL_COMPLETED' }), 4000);
        this.registry.set('lastLevelStats', { ...this.stats });
        // this.scene.restart({ gameStatus: 'LEVEL_COMPLETED' });
      }
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

  getCurrentStats():any {
    let stats = this.registry.get('stats');
    if (!stats) {
      stats = { ...DEFAULT_STATS };
    }
    return stats;
  }
}
export default Play;

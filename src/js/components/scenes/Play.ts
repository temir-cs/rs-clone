/* eslint-disable class-methods-use-this */

import * as Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';
import EventEmitter from '../events/Emitter';
import effectAnims from '../animations/effectsAnim';
import teslaBallAnims from '../animations/teslaBallAnims';
import Collectable from '../collectables/Collectable';
import Collectables from '../groups/Collectables';
import Traps from '../groups/Traps';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';

import Key from '../collectables/Key';
import Hud from '../hud/Hud';
import Door from '../helper_objects/Door';
import { createMapCastle,
        createLayersCastle,
        createBgCastle,
        bgParallaxCastle } from './levels_utils/castleUtils';
import { createMapForest,
        createLayersForest,
        createBgForest,
        bgParallaxForest } from './levels_utils/forestUtils';
import { createMapDungeon,
        createLayersDungeon,
        createBgDungeon,
        bgParallaxDungeon } from './levels_utils/dungeonUtils';
import { createMapFinal,
        createLayersFinal,
        createBgFinal,
        bgParallaxFinal } from './levels_utils/finalUtils';

import { DEFAULT_LEVEL,
          DEFAULT_STATS,
          LIVES,
          MUSIC_VOLUME_LEVEL,
          BOSS_LEVEL,
          BOSS_LVL_WIDTH,
          BOSS_LVL_HEIGHT,
          WORLD_Y1,
          WORLD_Y2_SHIFT,
          DOOR_Y_SHIFT,
          END_OF_LEVEL_WIDTH,
          END_OF_LEVEL_HEIGHT,
          BG_MUSIC_TIMEOUT,
          SCENE_RESTART_TIMEOUT,
          CAMERA_FADEIN_TIMEOUT,
          HOME_BTN_SHIFT,
          FOREST_LEVEL,
          CASTLE_LEVEL,
          DUNGEON_LEVEL,
          FINISH_GAME_LEVEL,
          ELEMENT_HOVER_COLOR,
          MUTE_BUTTON_MARGIN_X,
          MUTE_BUTTON_MARGIN_Y
        } from './consts';

import { SceneConfig,
          Stats } from '../interfaces/interfaces';
import Enemy from '../entities/Enemy';

type GameStatusType = {gameStatus: string};
type EnemyCollidersType = {
  colliders: {
    platformColliders?: Phaser.Tilemaps.TilemapLayer;
    player: Player;
  }
}
type PlayerCollidersType = {
  colliders: {
    platformColliders?: Phaser.Tilemaps.TilemapLayer;
    projectiles?: Phaser.GameObjects.Group;
    meleeWeapons?: Phaser.GameObjects.Group;
    collectables?: Collectables;
    trap?: Traps;
    collectableKey?: Key;
    potions?: Collectables;
  }
}

class Play extends Phaser.Scene {
  config: SceneConfig;
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
    trapsSpawns?: Phaser.Tilemaps.ObjectLayer,
    potions?: Phaser.Tilemaps.ObjectLayer,
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
    trapsSpawns: null,
    potions: null,
  };

  private collectables: Collectables;
  private potions: Collectables;
  private hud: Hud;
  private collectableKey: Key;
  private hasKey: boolean;

  lvlKey: string;
  private createMap: (context:Play) => void ;
  private createLayers: (context:Play) => void ;
  private createBg: (context:Play) => void ;
  private bgParallax: (context:Play) => void ;
  killCount: number;
  livesCount: number;
  stats: Stats;
  gameStatus: string;
  traps?: Traps;
  wallsImg?: Phaser.GameObjects.TileSprite;
  treesImg?: Phaser.GameObjects.TileSprite;
  bkgForest?: Phaser.GameObjects.TileSprite;
  bkgClouds?: Phaser.GameObjects.TileSprite;
  bkgMountains?: Phaser.GameObjects.TileSprite;
  mistImg?: Phaser.GameObjects.TileSprite;
  music: Phaser.Sound.BaseSound;
  canGoMenu: boolean;
  musicState: boolean;
  currentMusic: string;

  constructor(config: SceneConfig) {
    super('PlayScene');
    this.config = config;
  }

  create({ gameStatus } : GameStatusType):void {
    this.gameStatus = gameStatus;
    if (gameStatus === 'NEW_GAME') {
      EventEmitter.removeAllListeners();
      this.registry.set('stats', { ...DEFAULT_STATS });
    }
    this.cameras.main.fadeIn(CAMERA_FADEIN_TIMEOUT);
    this.checkLevel();
    this.hasKey = false;
    this.livesCount = this.getCurrentLives();
    this.stats = this.getCurrentStats();
    this.createMap(this);
    effectAnims(this.anims);
    teslaBallAnims(this.anims);
    this.createLayers(this);
    this.createCollectables(this.layers.collectables);
    const playerZones = this.getPlayerZones();
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(this.layers.enemySpawns, this.layers.enemiesPlatformColliders, player);
    this.createKeyCollectable(this.layers.collectableKey);
    if (this.layers.potions) {
      this.createPotions(this.layers.potions);
    }
    this.createTraps(this.layers.trapsSpawns, player);

    this.createBg(this);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: this.layers.enemiesPlatformColliders,
        player
      }
    });
    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: this.layers.platformColliders,
        meleeWeapons: enemies.getMeleeWeapons(),
        projectiles: enemies.getProjectiles(),
        collectables: this.collectables,
        collectableKey: this.collectableKey,
        trap: this.traps,
        potions: this.potions,
      }
    });

    this.hud = new Hud(this);
    this.hud.renderAvatar(player.hero);
    this.hud.renderLives(this.livesCount);

    this.createEndOfLevel(playerZones.end, player);
    this.createHomeButton();
    this.createMuteButton();
    this.setupFollowupCameraOn(player);

    if (gameStatus === 'PLAYER_LOSE' || gameStatus === 'LEVEL_COMPLETED') return;
    this.createGameEvents();
  }

  update():void {
    this.bgParallax(this);
    if (this.traps) {
      this.traps.update();
    }
    window.onhashchange = () => {
      this.registry.set('level', DEFAULT_LEVEL);
      this.scene.start('MenuScene');
      this.game.sound.stopAll();
    };
  }

  checkLevel():void {
    this.canGoMenu = true;
    this.musicState = true;
    if (localStorage.getItem('musicState') !== null) {
      this.musicState = false;
    }
    switch (this.getCurrentLevel()) {
      case FOREST_LEVEL:
        this.lvlKey = 'forest';
        this.createLayers = createLayersForest;
        this.createBg = createBgForest;
        this.bgParallax = bgParallaxForest;
        this.createMap = createMapForest;
        this.currentMusic = 'forest-theme';
        if (this.musicState === true) {
          this.playBgMusic(this.currentMusic);
        }
        break;
      case CASTLE_LEVEL:
        this.lvlKey = 'castle';
        this.createLayers = createLayersCastle;
        this.createBg = createBgCastle;
        this.bgParallax = bgParallaxCastle;
        this.createMap = createMapCastle;
        this.currentMusic = 'castle-theme';
        if (this.musicState === true) {
          this.playBgMusic(this.currentMusic);
        }
        break;
      case DUNGEON_LEVEL:
        this.lvlKey = 'dungeon';
        this.createLayers = createLayersDungeon;
        this.createBg = createBgDungeon;
        this.bgParallax = bgParallaxDungeon;
        this.createMap = createMapDungeon;
        this.currentMusic = 'dungeon-theme';
        if (this.musicState === true) {
          this.playBgMusic(this.currentMusic);
        }
        break;
      case BOSS_LEVEL:
        this.lvlKey = 'final';
        this.createLayers = createLayersFinal;
        this.createBg = createBgFinal;
        this.bgParallax = bgParallaxFinal;
        this.createMap = createMapFinal;
        this.currentMusic = 'boss-theme';
        if (this.musicState === true) {
          this.playBgMusic(this.currentMusic);
        }
        break;
      case FINISH_GAME_LEVEL:
        this.scene.start('GameOverWin');
        this.setFinalStats();
        this.registry.set('level', DEFAULT_LEVEL);
        break;
      default:
        break;
    }
  }

  createTraps(layer: Phaser.Tilemaps.ObjectLayer, player: Player):void {
    this.traps = new Traps(this);
    const trapsTypes = this.traps.getTypes();
    layer.objects.forEach((obj) => {
      const trap = new trapsTypes[`${obj.type}Trap`](this, obj.x, obj.y, `${obj.type}-trap`, player);
      this.traps.add(trap);
    });
  }

  createKeyCollectable(layer: Phaser.Tilemaps.ObjectLayer):void {
    layer.objects.forEach((obj) => {
      this.collectableKey = new Key(this, obj.x, obj.y);
    });
    this.physics.add.existing(this.collectableKey);
  }

  createPotions(layer: Phaser.Tilemaps.ObjectLayer):void {
    this.potions = new Collectables(this, 'Potion').setDepth(-1);
    this.potions.addFromLayer(layer);
  }

  createCollectables(collectableLayer: Phaser.Tilemaps.ObjectLayer):void {
    this.collectables = new Collectables(this, 'Coin').setDepth(-1);
    this.collectables.addFromLayer(collectableLayer);
  }

  playBgMusic(musicTheme:string):void {
    this.music = this.sound.add(musicTheme, { loop: true, volume: MUSIC_VOLUME_LEVEL });
    this.music.play();
  }

  stopBgMusic():void {
    if (this.music) {
      this.music.stop();
    }
  }

  createGameEvents():void {
    EventEmitter.on('PLAYER_LOSE', () => {
      this.stopBgMusic();
      this.livesCount -= 1;
      this.restartLevel();
    });

    EventEmitter.on('ENEMY_KILLED', () => {
      this.stats.kills += 1;
      this.registry.set('stats', { ...this.stats });
    });
  }

  createPlayer(start:Phaser.Types.Tilemaps.TiledObject):Player {
    return new Player(this, start.x, start.y);
  }

  createEnemies(enemySpawnsLayer: Phaser.Tilemaps.ObjectLayer, collider: Phaser.Tilemaps.TilemapLayer, player:Player):Enemies {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    const enemySpawns = enemySpawnsLayer.objects;
    enemySpawns.forEach((spawn) => {
        const enemy = new enemyTypes[spawn.type](this, spawn.x, spawn.y, player);
        enemy.setColliders(collider);
        enemies.add(enemy);
    });
    return enemies;
  }

  onPlayerCollision(enemy: Projectile | MeleeWeapon, player: Player):void {
    player.takesHit(enemy);
  }

  onWeaponHit(entity: Player | Enemy, source: Projectile | MeleeWeapon):void {
    entity.takesHit(source);
  }

  createEnemyColliders(enemies: Enemies, { colliders }:EnemyCollidersType):void {
    enemies
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onWeaponHit)
      .addOverlap(colliders.player.meleeWeapon, this.onWeaponHit);
  }

  onCollect(entity: Player, collectable: Collectable):void {
    this.stats.coins += collectable.score;
    this.registry.set('stats', { ...this.stats });
    collectable.pickupSound.play();
    this.hud.updateScoreBoard(this.stats.coins);
    collectable.disableBody(true, true);
  }

  onKeyCollect():void {
    this.collectableKey.pickupSound.play();
    this.collectableKey.disableBody(true, true);
    this.hasKey = true;
    this.hud.activateKey();
  }

  onPotionCollect(entity: Player, collectable: Collectable):void {
    if (entity.active) {
      entity.recover();
      collectable.pickupSound.play();
      collectable.disableBody(true, true);
    }
  }

  createPlayerColliders(player: Player, { colliders }:PlayerCollidersType):void {
    player
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.projectiles, this.onWeaponHit)
      .addCollider(colliders.meleeWeapons, this.onWeaponHit)
      .addOverlap(colliders.collectables, this.onCollect, this)
      .addOverlap(colliders.trap, this.onWeaponHit, this)
      .addOverlap(colliders.collectableKey, this.onKeyCollect, this)
      .addOverlap(colliders.potions, this.onPotionCollect, this);
  }

  setupFollowupCameraOn(player:Player):void {
    const { height, width, mapOffset, heightOffset, zoomFactor } = this.config;

    if (this.getCurrentLevel() === BOSS_LEVEL) {
      this.physics.world.setBounds(0, WORLD_Y1, BOSS_LVL_WIDTH, BOSS_LVL_HEIGHT + WORLD_Y2_SHIFT);
      this.cameras.main.setBounds(0, 0, BOSS_LVL_WIDTH, BOSS_LVL_HEIGHT).setZoom(zoomFactor);
    } else {
      this.physics.world.setBounds(0, WORLD_Y1, width + mapOffset, height + heightOffset + WORLD_Y2_SHIFT);
      this.cameras.main.setBounds(0, 0, width + mapOffset, height + heightOffset).setZoom(zoomFactor);
    }

    this.cameras.main.startFollow(player);
  }

  getPlayerZones():{start:Phaser.Types.Tilemaps.TiledObject; end: Phaser.Types.Tilemaps.TiledObject} {
    const zones = this.layers.playerZones.objects;
    return {
      start: zones[0],
      end: zones[1],
    };
  }

  getCurrentLevel():number {
    return this.registry.get('level') || DEFAULT_LEVEL;
  }

  getCurrentLives():number {
    return this.gameStatus === 'NEW_GAME' ? LIVES : this.registry.get('livesCount');
  }

  getCurrentStats():Stats {
    let stats = this.registry.get('stats');
    if (!stats) {
      stats = { ...DEFAULT_STATS };
    }
    return stats;
  }

  setFinalStats():void {
    const finalStats = { ...this.getCurrentStats(), level: this.getCurrentLevel() };
    this.registry.set('finalStats', { ...finalStats });
  }

  createEndOfLevel(end: Phaser.Types.Tilemaps.TiledObject, player: Player):void {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setSize(END_OF_LEVEL_WIDTH, END_OF_LEVEL_HEIGHT);

    const door = new Door(this, end.x, end.y - DOOR_Y_SHIFT, this.lvlKey).setDepth(-1);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      if (this.hasKey) {
        if (this.getCurrentLevel() === BOSS_LEVEL && localStorage.getItem('boss') !== 'dead') {
          return;
        }
        localStorage.removeItem('boss');
        this.canGoMenu = false;
        eolOverlap.active = false;
        door.openDoor();
        this.registry.inc('level', 1);
        this.cameras.main.fadeOut(CAMERA_FADEIN_TIMEOUT);
        setTimeout(() => this.stopBgMusic(), BG_MUSIC_TIMEOUT);
        setTimeout(() => this.scene.restart({ gameStatus: 'LEVEL_COMPLETED' }), SCENE_RESTART_TIMEOUT);
        this.registry.set('lastLevelStats', { ...this.stats });
        this.registry.set('livesCount', this.livesCount);
      }
    });
  }

  createHomeButton():void {
    const homeButton = this.add.image(this.config.rightBottomCorner.x - HOME_BTN_SHIFT, this.config.rightBottomCorner.y - HOME_BTN_SHIFT, 'home')
      .setOrigin(1, 1)
      .setScrollFactor(0)
      .setScale(1)
      .setInteractive();

    homeButton.on('pointerup', () => {
      if (this.canGoMenu === false) { return; }
      this.registry.set('level', DEFAULT_LEVEL);
      this.scene.start('MenuScene');
      this.game.sound.stopAll();
    });

    homeButton.on('pointerover', () => {
      homeButton.setTint(ELEMENT_HOVER_COLOR);
    });

    homeButton.on('pointerout', () => {
      homeButton.clearTint();
    });
  }

  createMuteButton():void {
    const muteButton = this.add.image(this.config.rightBottomCorner.x - MUTE_BUTTON_MARGIN_X, this.config.rightBottomCorner.y - MUTE_BUTTON_MARGIN_Y, 'mute')
      .setOrigin(1, 1)
      .setScrollFactor(0)
      .setScale(1)
      .setInteractive();

    muteButton.on('pointerup', () => {
      if (this.canGoMenu === false) { return; }
      if (this.musicState === true) {
        this.stopBgMusic();
        this.musicState = false;
        localStorage.setItem('musicState', 'false');
        return;
      }
      this.playBgMusic(this.currentMusic);
      this.musicState = true;
      localStorage.removeItem('musicState');
    });

    muteButton.on('pointerover', () => {
      muteButton.setTint(ELEMENT_HOVER_COLOR);
    });

    muteButton.on('pointerout', () => {
      muteButton.clearTint();
    });
  }

  restartLevel():void {
    this.registry.set('livesCount', this.livesCount);
    if (this.livesCount <= 0) {
      this.displayGameOver();
    } else {
      this.scene.restart({ gameStatus: 'PLAYER_LOSE' });
      this.stopBgMusic();
    }

    const currentLvl = this.getCurrentLevel();

    if (currentLvl > 1) {
      const lastLevelStats = this.registry.get('lastLevelStats') || { ...DEFAULT_STATS };
      this.registry.set('stats', { ...lastLevelStats });
    } else {
      this.registry.set('stats', { ...DEFAULT_STATS });
    }
  }

  displayGameOver():void {
    this.scene.start('GameOverFail');
    this.setFinalStats();
    this.registry.set('level', DEFAULT_LEVEL);
  }
}
export default Play;

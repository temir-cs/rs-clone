/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Phaser from 'phaser';

import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
import EventEmitter from '../events/Emitter';
import Projectiles from '../attacks/Projectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import BossMeleeWeapon from '../attacks/BossMeleeWeapon';
import Player from './Player';
import Play from '../scenes/Play';
import { SceneConfig } from '../interfaces/interfaces';
import {
  ENEMY_ORIGIN_X,
  ENEMY_ORIGIN_Y,
  ENEMY_GRAVITY,
  ENEMY_DEFAULT_SPEED,
  ENEMY_PATROL_DISTANCE,
  ENEMY_DEFAULT_HEALTH,
  ENEMY_DEFAULT_DAMAGE,
  ENEMY_HIT_VOLUME,
  ENEMY_DEATH_VOLUME,
  ENEMY_RAY_LENGTH,
  ENEMY_RAY_WIDTH,
  ENEMY_RAY_COLOR,
  ENEMY_RAYCAST_THRESHOLD,
  ENEMY_RAYCAST_STEEPNESS,
  ENEMY_RAYCAST_PRECISION,
  ENEMY_DEATH_VELOCITY_Y,
  ENEMY_HURT_SPEED_MULTIPLIER,
  ENEMY_DEATH_TINT_COLOR,
} from './consts';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  config: SceneConfig;
  body: Phaser.Physics.Arcade.Body;
  projectiles?: Projectiles;
  meleeWeapon?: BossMeleeWeapon;
  hitSound: Phaser.Sound.BaseSound;
  deathSound: Phaser.Sound.BaseSound;
  lastDirection?: number;
  gravity: number;
  timeFromLastTurn: number;
  speed: number;
  maxPatrolDistance: number;
  currentPatrolDistance: number;
  rayGraphics: Phaser.GameObjects.Graphics;
  collidersLayer: Phaser.Tilemaps.TilemapLayer;
  enemyName: string;
  isDead: boolean;
  damage: number;
  health: number;
  player: Player;
  isPlayingAnims?: (animKey: string) => boolean;
  raycast: (body: Phaser.Physics.Arcade.Body, rayLength: number, precision: number, steepness: number)
            => {ray: Phaser.Geom.Line, hasHit: boolean};

  constructor(scene: Play, x:number, y:number, key:string, player: Player) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.config = scene.config;

    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.player = player;

    this.init();
    this.initEvents();
  }

  init():void {
    this.gravity = ENEMY_GRAVITY;
    this.speed = ENEMY_DEFAULT_SPEED;
    this.timeFromLastTurn = 0;
    this.maxPatrolDistance = ENEMY_PATROL_DISTANCE;
    this.currentPatrolDistance = 0;

    this.enemyName = null;
    this.health = ENEMY_DEFAULT_HEALTH;
    this.damage = ENEMY_DEFAULT_DAMAGE;
    this.projectiles = null;
    this.meleeWeapon = null;
    this.isDead = false;
    this.hitSound = this.scene.sound.add('troll-hit', { volume: ENEMY_HIT_VOLUME });
    this.deathSound = this.scene.sound.add('troll-dead', { volume: ENEMY_DEATH_VOLUME });

    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: ENEMY_RAY_WIDTH, color: ENEMY_RAY_COLOR } });

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setOrigin(ENEMY_ORIGIN_X, ENEMY_ORIGIN_Y);
    this.setVelocityX(this.speed);
  }

  initEvents():void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time:number, delta?:number):void {
    this.patrol(time);
  }

  patrol(time:number):void {
    if (!this.body || !this.body.onFloor()) {
      return;
    }
    const { ray, hasHit } = this.raycast(this.body, ENEMY_RAY_LENGTH, ENEMY_RAYCAST_PRECISION, ENEMY_RAYCAST_STEEPNESS);
    this.currentPatrolDistance += Math.abs(this.body.deltaX());

    const raycastThreshold = ENEMY_RAYCAST_THRESHOLD;

    if ((!hasHit || this.currentPatrolDistance >= this.maxPatrolDistance)
      && this.timeFromLastTurn + raycastThreshold < time) {
      this.setFlipX(!this.flipX);
      this.setVelocityX(this.speed = -this.speed);
      this.timeFromLastTurn = time;
      this.currentPatrolDistance = 0;
    }
    if (this.config.debug && ray) {
      this.rayGraphics.clear();
      this.rayGraphics.strokeLineShape(ray);
    }
  }

  setColliders(collidersLayer: Phaser.Tilemaps.TilemapLayer):void {
    this.collidersLayer = collidersLayer;
  }

  playHitSound():void {
    if (this.health > 0) {
      this.hitSound.play();
    } else {
      this.deathSound.play();
    }
  }

  takesHit(source: Projectile | MeleeWeapon):void {
    source.deliversHit(this);
    this.health -= source.damage;
    this.playHitSound();
    this.setVelocityX(this.speed * ENEMY_HURT_SPEED_MULTIPLIER);
    this.play(`${this.enemyName}-hurt`, true);

    if (this.health <= 0) {
      EventEmitter.emit('ENEMY_KILLED');
      this.setTint(ENEMY_DEATH_TINT_COLOR);
      this.setVelocity(0, ENEMY_DEATH_VELOCITY_Y);
      this.play(`${this.enemyName}-death`, true);
      this.setVelocityX(0);
      this.isDead = true;
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }
}

export default Enemy;

import * as Phaser from 'phaser';

import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
import EventEmitter from '../events/Emitter';
import Projectiles from '../attacks/Projectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import Player from './Player';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  config: any;
  body: Phaser.Physics.Arcade.Body;
  projectiles?: Projectiles;
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
  damage: number;
  health: number;
  player: Player;
  isPlayingAnims?: (animKey: string) => boolean;
  raycast: (body: Phaser.Physics.Arcade.Body, rayLength: number, precision: number, steepness: number)
            => {ray: Phaser.Geom.Line, hasHit: boolean};

  constructor(scene: any, x:number, y:number, key:string, player: Player) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.config = scene.config;
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.player = player;

    this.setOrigin(0.5, 1);
    this.init();
    this.initEvents();
  }

  init():void {
    this.gravity = 500;
    this.speed = 80;
    this.timeFromLastTurn = 0;
    this.maxPatrolDistance = 400;
    this.currentPatrolDistance = 0;

    this.health = 40;
    this.damage = 10;
    this.projectiles = null;
    this.hitSound = this.scene.sound.add('troll-hit', { volume: 0.4 });
    this.deathSound = this.scene.sound.add('troll-dead', { volume: 0.4 });

    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setOrigin(0.5, 1);
    this.setVelocityX(this.speed);
  }

  initEvents():void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time:number, delta:number):void {
    this.patrol(time);
  }

  patrol(time:number):void {
    if (!this.body || !this.body.onFloor()) {
      return;
    }
    const { ray, hasHit } = this.raycast(this.body, 70, 0, 0.5);
    this.currentPatrolDistance += Math.abs(this.body.deltaX());

    const raycastThreshold = 200;

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

    if (this.health <= 0) {
      EventEmitter.emit('ENEMY_KILLED');
      this.setTint(0xff0000);
      this.setVelocity(0, -200);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }
}

export default Enemy;

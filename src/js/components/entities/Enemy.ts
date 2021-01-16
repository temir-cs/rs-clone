import * as Phaser from 'phaser';

import collidable from '../mixins/collidable';
import anims from '../mixins/anims';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  config: any;
  body: Phaser.Physics.Arcade.Body;
  raycast: any;
  gravity: number;
  timeFromLastTurn: number;
  speed: number;
  maxPatrolDistance: number;
  currentPatrolDistance: number;
  rayGraphics: Phaser.GameObjects.Graphics;
  collidersLayer: any;
  damage: number;
  health: number;
  isPlayingAnims?: any;
  constructor(scene:any, x:number, y:number, key:string) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.config = scene.config;
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.setOrigin(0.5, 1);
    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 80;
    this.timeFromLastTurn = 0;
    this.maxPatrolDistance = 400;
    this.currentPatrolDistance = 0;

    this.health = 40;
    this.damage = 10;

    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setOrigin(0.5, 1);
    // this.setSize(56, 56);
    // this.setOffset(0, 72);
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

  setColliders(collidersLayer:Phaser.Tilemaps.Tilemap):void {
    this.collidersLayer = collidersLayer;
  }

  takesHit(source):void {
    source.deliversHit(this);
    this.health -= source.damage;

    if (this.health <= 0) {
      console.log('Enemy is terminated!');
    }
  }
}

export default Enemy;

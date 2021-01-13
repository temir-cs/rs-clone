import * as Phaser from 'phaser';

import collidable from '../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  config: Phaser.Types.Core.GameConfig;
  private gravity: number;
  private timeFromLastTurn: number;
  private speed: number;
  private maxPatrolDistance: number;
  private currentPatrolDistance: number;
  private rayGraphics: Phaser.GameObjects.Graphics;
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.config = scene.config;

    Object.assign(this, collidable);

    this.setOrigin(0.5, 1);
    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 50;
    this.timeFromLastTurn = 0;
    this.maxPatrolDistance = 250;
    this.currentPatrolDistance = 0;
    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setOrigin(0.5, 1);
    this.setSize(30, 45);
    this.setOffset(8, 20);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
    this.patrol(time);
  }

  patrol(time) {
    if (!this.body || !this.body.onFloor()) {
      return;
    }
    const { ray, hasHit } = this.raycast(this.body, 30, 2, 0.3);

    this.currentPatrolDistance += Math.abs(this.body.deltaX());

    const raycastThreshold = 100;

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

  setColliders(collidersLayer) {
    this.collidersLayer = collidersLayer;
  }
}

export default Enemy;

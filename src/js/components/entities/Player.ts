import * as Phaser from 'phaser';
import initAnimations from './playerAnims';

import collidable from '../mixins/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  playerSpeed: number;
  gravity: number;
  cursors: any;
  jumpCount: number;
  consecutiveJumps: number;
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    // this.scene.anims.create({
    //   key: 'run',
    //   frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 6 }),
    //   frameRate: 8,
    //   repeat: -1
    // });
    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    // super.preUpdate(time, delta);
    const { left, right, space } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (isSpaceJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.playerSpeed * 1.5);
      this.jumpCount += 1;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    if (onFloor) {
      if (this.body.velocity.x !== 0) {
        this.play('run', true);
      } else {
        this.play('idle', true);
      }
    } else {
      this.play('jump', true);
    }

    // this.body.velocity.x !== 0 ? this.play('run', true) : this.play('idle', true);
    // if (this.body.velocity.x !== 0) {
    //   this.play('run', true);
    // } else {
    //   this.play('idle', true);
    // }

    // this.play('run', true);
  }

  // addCollider(otherGameobject) {
  //   this.scene.physics.add.collider(this, otherGameobject, null);
  // }
}

export default Player;

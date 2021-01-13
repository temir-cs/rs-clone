import * as Phaser from 'phaser';

import initAnimations from './playerAnims';

import collidable from '../mixins/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  playerSpeed: number;
  jumpHeight: number;
  gravity: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpCount: number;
  consecutiveJumps: number;

  constructor(scene, x:number, y:number) {
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

    this.jumpHeight = 300;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims);
  }

  initEvents():void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update():void {
    const { left, right, space, up } = this.cursors;
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
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

    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.jumpHeight);
      this.jumpCount += 1;
      console.log("jump",this.jumpCount)
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

    // this.play('run', true);
  }

  // addCollider(otherGameobject) {
  //   this.scene.physics.add.collider(this, otherGameobject, null);
  // }
}

export default Player;

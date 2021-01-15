import * as Phaser from 'phaser';
import HealthBar from '../hud/HealthBar';
import initAnimations from '../animations/playerAnims';
import collidable from '../mixins/collidable';
import Projectile from '../attacks/Projectile';
import Projectiles from '../attacks/Projectiles';

class Player extends Phaser.Physics.Arcade.Sprite {
  scene: any;
  body: Phaser.Physics.Arcade.Body;
  playerSpeed: number;
  jumpHeight: number;
  gravity: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpCount: number;
  consecutiveJumps: number;
  hasBeenHit: boolean;
  bounceVelocity: number;
  health: number;
  hp: any;
  config: any;
  projectiles: any;
  lastDirection: any;

  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 600;
    this.playerSpeed = 300;
    this.bounceVelocity = 200;
    this.jumpHeight = 400;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene);

    this.health = 100;
    this.hp = new HealthBar(
      this.scene,
      this.scene.config.leftTopCorner.x + 10,
      this.scene.config.leftTopCorner.y + 10,
      1,
      this.health
    );

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);

    initAnimations(this.scene.anims);

    this.scene.input.keyboard.on('keydown-Q', () => {
      console.log('pressing Q');
      this.projectiles.fireProjectile(this);
    });
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  playDamageTween() {
    return this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  update():void {
    const { left, right, space, up } = this.cursors;
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.jumpHeight);
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
  }

  bounceOff():void {
    const rightTouch = this.body.touching.right;
    // eslint-disable-next-line no-unused-expressions
    rightTouch
      ? this.setVelocityX(-this.bounceVelocity)
      : this.setVelocityX(this.bounceVelocity);

    setTimeout(() => this.setVelocityY(-this.bounceVelocity));
  }

  takesHit(initiator):void {
    if (this.hasBeenHit) {
      return;
    }
    this.hasBeenHit = true;
    this.bounceOff();
    const damageAnim = this.playDamageTween();

    this.health -= initiator.damage;
    this.hp.decrease(this.health);

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.hasBeenHit = false;
        damageAnim.stop();
        this.clearTint();
      },
      loop: false,
    });
  }
}

export default Player;

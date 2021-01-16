import * as Phaser from 'phaser';
import HealthBar from '../hud/HealthBar';
import initAnimations from '../animations/playerAnims';
import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
import Projectile from '../attacks/Projectile';
import Projectiles from '../attacks/Projectiles';
import EventEmitter from '../events/Emitter';
import MeleeWeapon from '../attacks/MeleeWeapon';
import getTimestamp from '../utils/functions';

class Player extends Phaser.Physics.Arcade.Sprite {
  scene: any;
  body: Phaser.Physics.Arcade.Body;
  hero: string;
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
  isPlayingAnims: any;
  meleeWeapon: any;
  timeFromLastSwing: any;
  zapSound: any;
  swordSound: any;
  stepSound: any;
  jumpSound: any;
  damageSound: any;

  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
    this.update = this.update.bind(this);
  }

  init() {
    this.hero = 'knight';
    this.gravity = 600;

    this.playerSpeed = 300;
    this.bounceVelocity = 200;
    this.jumpHeight = 400;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.stepSound = this.scene.sound.add('step', { volume: 0.03 });
    this.jumpSound = this.scene.sound.add('jump', { volume: 0.1 });
    this.zapSound = this.scene.sound.add('zap', { volume: 0.4 });
    this.swordSound = this.scene.sound.add('sword-swing', { volume: 0.2 });
    this.damageSound = this.scene.sound.add('damage', { volume: 0.03 });

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene);
    this.meleeWeapon = new MeleeWeapon(this.scene, 0, 0, 'attack', this);
    this.timeFromLastSwing = null;

    this.health = 60;
    this.hp = new HealthBar(
      this.scene,
      this.scene.config.leftTopCorner.x + 10,
      this.scene.config.leftTopCorner.y + 10,
      1,
      this.health
    );

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    // this.setBodySize(60, 60, true);
    // this.setOrigin(0.5, 1);
    // this.setOffset(15, 50);
    this.setBodySize(40, 56, true);
    this.setOffset(22, 54);
    this.setOrigin(0.5, 1);

    initAnimations(this.scene.anims, this.hero);

    this.scene.time.addEvent({
      delay: 400,
      repeat: -1,
      callbackScope: this,
      callback: () => {
        if (this.isPlayingAnims('run')) {
          this.stepSound.play();
        }
      }
    });

    this.scene.input.keyboard.on('keydown-Q', () => {
      this.play('sword-attack', true);
      this.projectiles.fireProjectile(this);
      this.zapSound.play();
    });

    this.scene.input.keyboard.on('keydown-E', () => {
      if (this.timeFromLastSwing && this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimestamp()) {
        // console.log('OSTANOVITES!');
        return;
      }

      this.play('sword-attack', true);
      this.swordSound.play();
      this.meleeWeapon.swing(this);
      this.timeFromLastSwing = getTimestamp();
    });
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  playDamageTween() {
    this.play('hurt');
    return this.scene.tweens.add({
      targets: this,
      duration: 80,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  update():void {
    if (this.hasBeenHit || !this.body) return;

    if (this.getBounds().top > this.scene.config.height + 250) {
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }

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
      this.jumpSound.play();
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    if (this.isPlayingAnims('sword-attack')) {
      return;
    }

    if (onFloor) {
      if (this.body.velocity.x !== 0) {
        this.play('run', true);
      } else {
        this.play('idle', true);
      }
    } else {
      if (this.jumpCount === 0) {
        this.play('jump', true);
      } else {
        this.play('midjump', true);
      }
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
    if (this.hasBeenHit) return;

    this.health -= initiator.damage;
    // TEMIR - ADDED FUNCTIONALITY FOR SCENE CHANGE
    if (this.health <= 0) {
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }

    this.hasBeenHit = true;
    this.bounceOff();
    this.damageSound.play();
    const damageAnim = this.playDamageTween();

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

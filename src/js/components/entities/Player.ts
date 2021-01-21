import * as Phaser from 'phaser';
import HealthBar from '../hud/HealthBar';
import Hud from '../hud/Hud';
import initAnimations from '../animations/playerAnims';
import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
// import Projectile from '../attacks/Projectile';
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
  zapSound: Phaser.Sound.BaseSound;
  swordSound: Phaser.Sound.BaseSound;
  stepSound: Phaser.Sound.BaseSound;
  jumpSound: Phaser.Sound.BaseSound;
  hitSound: Phaser.Sound.BaseSound;
  deathSound: Phaser.Sound.BaseSound;

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
    this.hasBeenHit = false;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.stepSound = this.scene.sound.add('step', { volume: 0.03 });
    this.jumpSound = this.scene.sound.add('jump', { volume: 0.1 });
    this.zapSound = this.scene.sound.add('zap', { volume: 0.4 });
    this.swordSound = this.scene.sound.add('sword-swing', { volume: 0.2 });
    this.hitSound = this.scene.sound.add('player-hit', { volume: 0.03 });
    this.deathSound = this.scene.sound.add('player-dead', { volume: 0.05 });

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene, 'fire-projectile');
    this.meleeWeapon = new MeleeWeapon(this.scene, 0, 0, 'attack', this);
    this.timeFromLastSwing = null;

    this.health = 60;
    this.hp = new HealthBar(
      this.scene,
      this.scene.config.leftTopCorner.x + 65,
      this.scene.config.leftTopCorner.y + 10,
      1,
      this.health
    );

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    // this.setBodySize(60, 60, true);
    // this.setOrigin(0.5, 1);
    // this.setOffset(15, 50);
    this.setBodySize(30, 56, true);
    this.setOffset(30, 54);
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

    this.handleAttacks();
    this.handleMovements();
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

  playDeath() {
    console.log('DEATH!');
    this.play('death');
    return this.scene.tweens.add({
      targets: this,
      duration: 80,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  update():void {
    if (this.hasBeenHit || !this.body) return;
    // 450
    if (this.getBounds().top > this.scene.config.height + 650) {
      this.deathSound.play();
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }

    const { left, right, space, up, down } = this.cursors;
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();

    if (onFloor && down.isDown) {
      if (!this.isAttacking()) this.sitDown();
      return;
    }

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

    if (this.isPlayingAnims('sword-attack') || this.isPlayingAnims('run-attack')) {
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

  handleAttacks():void {
    this.scene.input.keyboard.on('keydown-Q', () => {
      if (this.projectiles.fireProjectile(this, 'fire-projectile')) {
        this.play('sword-attack', true);
        this.zapSound.play();
      }
    });

    this.scene.input.keyboard.on('keydown-E', () => {
      if (this.timeFromLastSwing && this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimestamp()) return;

      if (this.body.onFloor() && this.body.velocity.x !== 0) {
        this.play('run-attack', true);
      } else {
        this.play('sword-attack', true);
      }
      this.swordSound.play();
      this.meleeWeapon.swing(this);
      this.timeFromLastSwing = getTimestamp();
    });
  }

  isAttacking():boolean {
    return this.isPlayingAnims('sword-attack') || this.isPlayingAnims('run-attack');
  }

  resetMovements():void {
    this.body.setSize(30, 56);
    this.setOffset(30, 54);
    this.setY(this.body.y + 30);
  }

  handleMovements():void {
    this.scene.input.keyboard.on('keydown-DOWN', () => {
      this.sitDown();
    });

    this.scene.input.keyboard.on('keyup-DOWN', () => {
      if (!this.body.onFloor()) return;
      this.resetMovements();
    });
  }

  sitDown():void {
    if (!this.body.onFloor()) return;
    this.body.setSize(30, 28);
    this.setOffset(30, 82);
    this.setVelocityX(0);
    this.play('crouch', true);
  }

  isSitting():boolean {
    return this.isPlayingAnims('sit-down');
  }

  bounceOff():void {
    const rightTouch = this.body.touching.right;
    // eslint-disable-next-line no-unused-expressions
    rightTouch
      ? this.setVelocityX(-this.bounceVelocity)
      : this.setVelocityX(this.bounceVelocity);

    setTimeout(() => this.setVelocityY(-this.bounceVelocity));
  }

  checkAfterHit(source, status:boolean):void {
    this.hasBeenHit = true;
    this.bounceOff();
    let damageAnim:any = null;
    if (status === true) {
      damageAnim = this.playDamageTween();
      this.hitSound.play();
    } else {
      damageAnim = this.playDeath();
      this.deathSound.play();
    }

    this.hp.decrease(this.health);

    if (source.deliversHit) {
      source.deliversHit(this);
    }

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
          this.hasBeenHit = false;
          damageAnim.stop();
          this.clearTint();
          if (status === false) {
            this.setVisible(false);
            this.body.destroy();
            this.setActive(false);
            setTimeout(() => EventEmitter.emit('PLAYER_LOSE'), 2000);
          }
      },
      loop: false,
    });
  }

  takesHit(source):void {
    if (this.hasBeenHit) return;

    this.health -= source.damage;
    if (this.health <= 0) {
      // EventEmitter.emit('PLAYER_LOSE');
      // return;
      this.checkAfterHit(source, false);
      return;
    }
    this.checkAfterHit(source, true);
    this.resetMovements();
  }
}

export default Player;

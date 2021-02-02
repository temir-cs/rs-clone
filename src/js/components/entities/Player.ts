import * as Phaser from 'phaser';
import Play from '../scenes/Play';
import HealthBar from '../hud/HealthBar';
import initAnimations from '../animations/playerAnims';
import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
import Projectile from '../attacks/Projectile';
import Projectiles from '../attacks/Projectiles';
import Collectable from '../collectables/Collectable';
import Enemy from './Enemy';
import EventEmitter from '../events/Emitter';
import MeleeWeapon from '../attacks/MeleeWeapon';
import { getTimestamp } from '../utils/functions';
import { colliderType, SceneConfig } from '../interfaces/interfaces';
import {
  PLAYER_GRAVITY,
  JUMP_HEIGHT,
  CONSECUTIVE_JUMPS,
  STEP_VOLUME,
  JUMP_VOLUME,
  ZAP_VOLUME,
  SWORD_VOLUME,
  PLAYER_HIT_VOLUME,
  PLAYER_DEATH_VOLUME,
  PLAYER_BODY_WIDTH,
  PLAYER_BODY_HEIGHT,
  PLAYER_BODY_OFFSET_X,
  PLAYER_BODY_OFFSET_Y,
  PLAYER_BODY_RESET_Y,
  PLAYER_BODY_ORIGIN_X,
  PLAYER_BODY_ORIGIN_Y,
  PLAYER_SIT_DOWN_OFFSET_Y,
  PLAYER_DEATH_EVENT_DELAY,
  PLAYER_DEATH_EVENT_EMIT_TIMEOUT,
  RUN_SOUND_DELAY,
  PLAYER_DAMAGE_TWEEN_DURATION,
  PLAYER_OFF_WORLD_BOUNDS_HEIGHT
} from './consts';
import {
  KNIGHT_HEALTH,
  KNIGHT_SPEED,
  KNIGHT_BOUNCE_VELOCITY,
} from '../scenes/consts';

class Player extends Phaser.Physics.Arcade.Sprite {
  scene: Play;
  config: SceneConfig;
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
  initialHealth: number;
  hp: HealthBar;
  projectiles: Projectiles;
  lastDirection: number;
  isPlayingAnims: (animKey: string) => boolean;
  meleeWeapon: MeleeWeapon;
  timeFromLastSwing: number;
  zapSound: Phaser.Sound.BaseSound;
  swordSound: Phaser.Sound.BaseSound;
  stepSound: Phaser.Sound.BaseSound;
  jumpSound: Phaser.Sound.BaseSound;
  hitSound: Phaser.Sound.BaseSound;
  deathSound: Phaser.Sound.BaseSound;
  addCollider: (otherGameobject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite
    | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
    callback?: (()=>void) | ((entity: Player, collectable: Collectable)=>void)
    | ((enemy: Projectile | MeleeWeapon, player: Player)=>void) |
    ((entity: Player | Enemy, source: Projectile | MeleeWeapon)=>void),
    context?: Phaser.Scene) => colliderType;

  constructor(scene:Play, x:number, y:number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
    this.update = this.update.bind(this);
  }

  init():void {
    const heroData = this.getCurrentHeroStats();
    this.hero = heroData.hero;
    this.health = heroData.health;
    this.initialHealth = heroData.health;
    this.hp = new HealthBar(
      this.scene,
      this.scene.config.leftTopCorner.x + 65,
      this.scene.config.leftTopCorner.y + 10,
      1,
      this.health
    );
    this.gravity = PLAYER_GRAVITY;

    this.playerSpeed = heroData.speed;
    this.bounceVelocity = heroData.bounceVelocity;
    this.jumpHeight = JUMP_HEIGHT;
    this.jumpCount = 0;
    this.hasBeenHit = false;
    this.consecutiveJumps = CONSECUTIVE_JUMPS;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.stepSound = this.scene.sound.add('step', { volume: STEP_VOLUME });
    this.jumpSound = this.scene.sound.add('jump', { volume: JUMP_VOLUME });
    this.zapSound = this.scene.sound.add('zap', { volume: ZAP_VOLUME });
    this.swordSound = this.scene.sound.add('sword-swing', { volume: SWORD_VOLUME });
    this.hitSound = this.scene.sound.add('player-hit', { volume: PLAYER_HIT_VOLUME });
    this.deathSound = this.scene.sound.add('player-dead', { volume: PLAYER_DEATH_VOLUME });

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene, 'fire-projectile');
    this.meleeWeapon = new MeleeWeapon(this.scene, 0, 0, 'attack', this);
    this.timeFromLastSwing = null;

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setBodySize(PLAYER_BODY_WIDTH, PLAYER_BODY_HEIGHT, true);
    this.setOffset(PLAYER_BODY_OFFSET_X, PLAYER_BODY_OFFSET_Y);
    this.setOrigin(PLAYER_BODY_ORIGIN_X, PLAYER_BODY_ORIGIN_Y);

    initAnimations(this.scene.anims, this.hero);

    this.scene.time.addEvent({
      delay: RUN_SOUND_DELAY,
      repeat: -1,
      callbackScope: this,
      callback: () => {
        if (this.isPlayingAnims(`${this.hero}-run`)) {
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

  playDamageTween():Phaser.Tweens.Tween {
    this.play(`${this.hero}-hurt`);
    return this.scene.tweens.add({
      targets: this,
      duration: PLAYER_DAMAGE_TWEEN_DURATION,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  playDeath():Phaser.Tweens.Tween {
    this.play(`${this.hero}-death`);
    return this.scene.tweens.add({
      targets: this,
      duration: PLAYER_DAMAGE_TWEEN_DURATION,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  update():void {
    if (this.hasBeenHit || !this.body) return;
    if (this.getBounds().top > this.scene.config.height + PLAYER_OFF_WORLD_BOUNDS_HEIGHT) {
      this.deathSound.play();
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }

    const { left, right, up, down } = this.cursors;
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    // const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
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

    if ((isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.jumpHeight);
      this.jumpCount += 1;
      this.jumpSound.play();
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    if (this.isPlayingAnims(`${this.hero}-attack`) || this.isPlayingAnims(`${this.hero}-run-attack`)) {
      return;
    }

    if (onFloor) {
      if (this.body.velocity.x !== 0) {
        this.play(`${this.hero}-run`, true);
      } else {
        this.play(`${this.hero}-idle`, true);
      }
    } else {
      if (this.jumpCount === 0) {
        this.play(`${this.hero}-jump`, true);
      } else {
        this.play(`${this.hero}-midjump`, true);
      }
    }
  }

  handleAttacks():void {
    this.scene.input.keyboard.on('keydown-Q', () => {
      if (this.hero === 'knight') {
        if (this.timeFromLastSwing && this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimestamp()) return;

        if (this.body.onFloor() && this.body.velocity.x !== 0) {
          this.play(`${this.hero}-run-attack`, true);
        } else {
          this.play(`${this.hero}-attack`, true);
        }
        this.swordSound.play();
        this.meleeWeapon.swing();
        this.timeFromLastSwing = getTimestamp();
      }

      if (this.hero === 'mage') {
        if (this.projectiles.fireProjectile(this, 'fire-projectile')) {
          this.play(`${this.hero}-attack`, true);
          this.zapSound.play();
        }
      }
    });

    this.scene.input.keyboard.on('keydown-E', () => {
      console.log('Action button pressed!');
    });
  }

  isAttacking():boolean {
    return this.isPlayingAnims(`${this.hero}-attack`) || this.isPlayingAnims(`${this.hero}-run-attack`);
  }

  resetMovements():void {
    this.body.setSize(PLAYER_BODY_WIDTH, PLAYER_BODY_HEIGHT);
    this.setOffset(PLAYER_BODY_OFFSET_X, PLAYER_BODY_OFFSET_Y);
    this.setY(this.body.y + PLAYER_BODY_RESET_Y);
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
    this.body.setSize(PLAYER_BODY_WIDTH, PLAYER_BODY_HEIGHT / 2);
    this.setOffset(PLAYER_BODY_OFFSET_X, PLAYER_SIT_DOWN_OFFSET_Y);
    this.setVelocityX(0);
    this.play(`${this.hero}-crouch`, true);
  }

  bounceOff(source: Projectile | MeleeWeapon):void {
    if (this.x < source.x) {
      this.setVelocityX(-this.bounceVelocity);
    } else {
      this.setVelocityX(this.bounceVelocity);
    }
    setTimeout(() => this.setVelocityY(-this.bounceVelocity));
  }

  checkAfterHit(source: Projectile | MeleeWeapon, status:boolean):void {
    this.hasBeenHit = true;
    this.bounceOff(source);
    let damageAnim:Phaser.Tweens.Tween = null;
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
      delay: PLAYER_DEATH_EVENT_DELAY,
      callback: () => {
          this.hasBeenHit = false;
          damageAnim.stop();
          this.clearTint();
          if (status === false) {
            this.setVisible(false);
            this.body.destroy();
            this.setActive(false);
            setTimeout(() => EventEmitter.emit('PLAYER_LOSE'), PLAYER_DEATH_EVENT_EMIT_TIMEOUT);
          }
      },
      loop: false,
    });
  }

  takesHit(source: Projectile | MeleeWeapon):void {
    if (this.hasBeenHit) return;

    this.health -= source.damage;
    if (this.health <= 0) {
      this.checkAfterHit(source, false);
      return;
    }
    this.checkAfterHit(source, true);
    this.resetMovements();
  }

  getCurrentHeroStats():{ hero: string, health: number, speed: number, bounceVelocity: number } {
    const data = this.scene.registry.get('currentHeroStats');
    if (data) return data;
    return { hero: 'knight', health: KNIGHT_HEALTH, speed: KNIGHT_SPEED, bounceVelocity: KNIGHT_BOUNCE_VELOCITY };
  }

  recover():void {
    this.health = this.initialHealth;
    this.hp.recover();
  }
}

export default Player;

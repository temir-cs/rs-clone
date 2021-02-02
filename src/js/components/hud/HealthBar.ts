import * as Phaser from 'phaser';
import {
  HEALTH_BAR_WIDTH,
  HEALTH_BAR_HEIGHT,
  HEALTH_BAR_DEPTH,
  HEALTH_BAR_MARGIN,
  HEALTH_BAR_WIDTH_DIVIDER
} from './consts';

class HealthBar {
  public bar: Phaser.GameObjects.Graphics;
  public x: number;
  public y: number;
  public health: number;
  initialValue: number;
  public value: number;
  public size: {width: number, height: number};
  public pixelPerHealth: number;
  public scale: number;
  constructor(scene:Phaser.Scene, x:number, y:number, scale = 1, health:number) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.scale = scale;
    this.x = x / scale;
    this.y = y / scale;
    this.value = health;
    this.initialValue = health;

    this.size = {
      width: HEALTH_BAR_WIDTH,
      height: HEALTH_BAR_HEIGHT
    };

    this.pixelPerHealth = this.size.width / this.value;
    scene.add.existing(this.bar).setDepth(HEALTH_BAR_DEPTH);
    this.draw(this.x, this.y, this.scale);
  }

  decrease(amount:number):void {
    if (amount <= 0) {
      this.value = 0;
    } else {
      this.value = amount;
    }
    this.draw(this.x, this.y, this.scale);
  }

  recover():void {
    this.value = this.initialValue;
    this.draw(this.x, this.y, this.scale);
  }

  draw(x:number, y:number, scale:number):Phaser.GameObjects.Graphics {
    this.bar.clear();
    const { width, height } = this.size;
    const margin = HEALTH_BAR_MARGIN;

    this.bar.fillStyle(0x000);
    this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xFFFFFF);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth:number = Math.floor(this.value * this.pixelPerHealth);

    if (healthWidth <= this.size.width / HEALTH_BAR_WIDTH_DIVIDER) {
      this.bar.fillStyle(0xFF0000);
    } else {
      this.bar.fillStyle(0x00FF00);
    }

    if (healthWidth > 0) {
      this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
    }

    return this.bar.setScrollFactor(0, 0).setScale(scale);
  }
}

export default HealthBar;

import * as Phaser from 'phaser';

class HealthBar {
  public bar: any;
  public x: number;
  public y: number;
  public health: number;
  public value: number;
  public size: any;
  public pixelPerHealth: number;
  public scale: number;
  constructor(scene:any, x:number, y:number, scale = 1, health:number) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.scale = scale;
    this.x = x / scale;
    this.y = y / scale;
    this.value = health;

    this.size = {
      width: 140,
      height: 18
    };

    this.pixelPerHealth = this.size.width / this.value;

    scene.add.existing(this.bar);
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

  draw(x:number, y:number, scale:number):void {
    this.bar.clear();
    const { width, height } = this.size;

    const margin = 2;

    this.bar.fillStyle(0x000);
    this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xFFFFFF);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth:number = Math.floor(this.value * this.pixelPerHealth);

    if (healthWidth <= this.size.width / 3) {
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

import * as Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  config: any;
  screenCenter: any;
  fontSize: number;
  fontStyle: string;
  lineHeight: number;
  fontOptions: object;
  fontFamily: string;

  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 52;
    this.fontStyle = 'bold';
    this.fontFamily = '"Press Start 2P"';
    this.lineHeight = 82;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };
  }

  create():void {
    this.add.image(0, 0, 'menu-bg')
      .setScale(2.5)
      .setOrigin(0, 0.4);

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 20, this.config.height - 20, 'back')
        .setInteractive()
        .setOrigin(1, 1);

        backButton.on('pointerup', () => {
          this.scene.start('MenuScene');
        });

        backButton.on('pointerover', () => {
          backButton.setTint(0x0FFF00);
        });

        backButton.on('pointerout', () => {
          backButton.clearTint();
        });
    }
  }

  createMenu(menu, setupMenuEvents):void {
    let lastMenuPositionY = 0;
    menu.forEach((item) => {
      const menuItem = item;
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGameObject = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;

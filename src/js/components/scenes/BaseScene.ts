import * as Phaser from 'phaser';

class BaseScene extends Phaser.Scene {

  config: any;
  screenCenter: any;
  fontSize: number;
  fontStyle: string;
  lineHeight: number;
  fontOptions: object;

  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 34;
    this.fontStyle = 'bold';
    this.lineHeight = 42;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fontStyle: this.fontStyle, fill: '#fff' }    
  }

  create() {
    this.add.image(0, 0, 'menu-bg').setOrigin(0, 0);

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        .setInteractive()
        .setScale(2)
        .setOrigin(1, 1);
      
        backButton.on('pointerup', () => {
          this.scene.start('MenuScene');
        })
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGameObject = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    })
  }
}

export default BaseScene;
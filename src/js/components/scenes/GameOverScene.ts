import BaseScene from './BaseScene';

class GameOverScene extends BaseScene {
  menu: any;
  newOptions: any;
  constructor(config) {
    super('GameOverScene', config);

    this.menu = [
      { scene: 'PlayScene', text: 'Restart' },
      { scene: 'MenuScene', text: 'Main menu' },
      { scene: null, text: 'Exit' }
    ];
  }

  create() {
    super.create();

    this.add.image(0, 0, 'game-over')
    .setOrigin(0, 0);

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));

    this.newOptions = {
      fontSize: '78px',
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };
    this.add.text(510, 150, 'GAME OVER', this.newOptions).setOrigin(0, 0);
  }

  setupMenuEvents(menuItem) {
    const textGameObject = menuItem.textGameObject;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    })

    textGameObject.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default GameOverScene;

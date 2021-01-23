import BaseScene from './BaseScene';

class MenuScene extends BaseScene {
  menu: any;
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      { scene: 'HeroSelectScene', text: 'Play' },
      { scene: 'LevelsScene', text: 'Levels' },
      { scene: 'HighscoreScene', text: 'Highscore' },
      { scene: null, text: 'Exit' }
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem)); // or bind.this
  }

  setupMenuEvents(menuItem) {
    const textGameObject = menuItem.textGameObject;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);
      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default MenuScene;

import BaseScene from './BaseScene';

class LevelsScene extends BaseScene {
  menu: any;
  constructor(config) {
    super('LevelsScene', { ...config, canGoBack: true });

    this.menu = [
      { scene: 'PlayScene', text: 'Level 1' },
      { scene: 'PlayScene', text: 'Level 2' },
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem)); // or bind.this
  }

  setupMenuEvents(menuItem) {
    const { textGameObject } = menuItem;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.scene) {
        this.scene.start(menuItem.scene);
      }

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default LevelsScene;

import BaseScene from './BaseScene';
import { SceneConfig, MenuType } from '../interfaces/interfaces';

class NavigationScene extends BaseScene {
  menu?: MenuType[];
  textGameObject: Phaser.GameObjects.Text;
  levels: number;
  constructor(config: SceneConfig, sceneName: string, canGoBack = false) {
    super(`${sceneName}`, { ...config, canGoBack });
  }

  create():void {
    super.create();
    this.createMenu(this.menu, (menuItem:MenuType) => this.setupMenuEvents(menuItem));
  }

  // eslint-disable-next-line class-methods-use-this
  setupMenuEvents(menuItem:MenuType): void {
    const { textGameObject } = menuItem;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });
  }
}

export default NavigationScene;

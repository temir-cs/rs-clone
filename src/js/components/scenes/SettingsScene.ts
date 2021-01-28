import BaseScene from './BaseScene';
import { DEFAULT_STATS } from './consts';
import { SceneConfig, MenuType } from '../interfaces/interfaces';

class SettingsScene extends BaseScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super('SettingsScene', { ...config, canGoBack: true });

    // this.menu = [
    //   { scene: 'PlayScene', text: 'Level 1' },
    //   { scene: 'PlayScene', text: 'Level 2' },
    // ];
  }

  create():void {
    super.create();

    this.menu = [
      { text: 'Fullscreen on/off' }
    ];
    this.createMenu(this.menu, (menuItem:MenuType) => this.setupMenuEvents(menuItem));
  }

  setupMenuEvents(menuItem:MenuType): void {
    const { textGameObject } = menuItem;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.text === 'Fullscreen on/off') {
        if (!this.scale.isFullscreen) {
          this.scale.startFullscreen();
        } else {
          this.scale.stopFullscreen();
        }
      }
    });
  }
}

export default SettingsScene;

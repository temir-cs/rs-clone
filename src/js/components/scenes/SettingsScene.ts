import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';

class SettingsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'SettingsScene', true);
    this.menu = [
      { text: 'Fullscreen on/off' }
    ];
  }

  create():void {
    super.create();
  }

  setupMenuEvents(menuItem:MenuType): void {
    super.setupMenuEvents(menuItem);

    const { textGameObject } = menuItem;
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

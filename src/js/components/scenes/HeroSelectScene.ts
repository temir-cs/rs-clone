import BaseScene from './BaseScene';
import EventEmitter from '../events/Emitter';
import { SceneConfig, FontConfig } from '../interfaces/interfaces';

import * as lang from '../../../assets/lang/lang.json';
import { chooseLang } from '../utils/functions';

const enOrRu = chooseLang(lang);

const KNIGHT_DESC = [
  `${enOrRu.HeroSelectScene.knightName}`,
  `${enOrRu.HeroSelectScene.knightClass}`,
  `${enOrRu.HeroSelectScene.knightCombat}`,
  `${enOrRu.HeroSelectScene.knightHealth}`,
  `${enOrRu.HeroSelectScene.knightSpeed}`,
];

const MAGE_DESC = [
  `${enOrRu.HeroSelectScene.mageName}`,
  `${enOrRu.HeroSelectScene.mageClass}`,
  `${enOrRu.HeroSelectScene.mageCombat}`,
  `${enOrRu.HeroSelectScene.mageHealth}`,
  `${enOrRu.HeroSelectScene.mageSpeed}`
];

const HERO_STATS = {
  knight: {
    hero: 'knight',
    health: 50,
    speed: 250,
    bounceVelocity: 120,
  },
  mage: {
    hero: 'mage',
    health: 30,
    speed: 300,
    bounceVelocity: 200,
  }
};

class HeroSelectScene extends BaseScene {
  fontOptions: FontConfig;

  constructor(config:SceneConfig) {
    super('HeroSelectScene', { ...config, canGoBack: true });
  }

  create():void {
    super.create();

    this.fontOptions = {
      fontSize: '18px',
      fontStyle: 'normal',
      fontFamily: '"Press Start 2P"',
      fill: '#fff',
    };

    const knightImage = this.add.image(this.screenCenter[0] - 250, this.screenCenter[1] - 100, 'knight-image')
      .setScale(3);
    const mageImage = this.add.image(this.screenCenter[0] + 150, this.screenCenter[1] - 100, 'mage-image')
      .setScale(3);

    this.setupMenuEvents(knightImage, 'knight');
    this.setupMenuEvents(mageImage, 'mage');

    this.addText(KNIGHT_DESC, -350, 20, 40);
    this.addText(MAGE_DESC, 50, 20, 40);
  }

  addText(textArr: Array<string>, xOffset:number, yOffset:number, lineHeight:number):void {
    for (let i = 0; i < textArr.length; i += 1) {
      const step = i * lineHeight;
      this.add.text(this.screenCenter[0] + xOffset, this.screenCenter[1] + yOffset + step, textArr[i], this.fontOptions);
    }
  }

  setupMenuEvents(item:Phaser.GameObjects.Image, hero:string):void {
    item.setInteractive();

    item.on('pointerup', () => {
      this.registry.set('currentHeroStats', HERO_STATS[hero]);
      // console.log('Hero: ', HERO_STATS[hero]);
      this.scene.start('PlayScene', { gameStatus: 'NEW_GAME' });
    });

    item.on('pointerover', () => {
      item.setTint(0x0FFF00);
    });

    item.on('pointerout', () => {
      item.clearTint();
    });
  }
}

export default HeroSelectScene;

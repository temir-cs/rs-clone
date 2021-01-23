import BaseScene from './BaseScene';
import EventEmitter from '../events/Emitter';

const KNIGHT_DESC = [
  'Vincent',
  'Role: Knight',
  'Combat: Melee',
  'Health: More',
  'Speed: Slow',
];

const MAGE_DESC = [
  'Valerie',
  'Role: Mage',
  'Combat: Ranged',
  'Health: Less',
  'Speed: Fast',
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
    health: 25,
    speed: 300,
    bounceVelocity: 200,
  }
};

class HeroSelectScene extends BaseScene {
  constructor(config) {
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

  setupMenuEvents(item, hero:string):void {
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
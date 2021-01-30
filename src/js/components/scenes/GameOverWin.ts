import GameOver from './GameOver';
import { SceneConfig } from '../interfaces/interfaces';
import { DEFAULT_LEVEL } from './consts';

class GameOverWin extends GameOver {
  constructor(config:SceneConfig) {
    super(config, 'GameOverWin');
  }

  create():void {
    super.create();
    this.music = this.sound.add('game-win', { volume: 0.1 });
    this.music.play();
    this.registry.set('level', DEFAULT_LEVEL);
    this.add.image(0, 0, 'win-bg').setScale(1.4).setOrigin(0, 0);
    this.add.image(this.screenCenter[0], this.screenCenter[1] - 100, 'finish-game')
      .setOrigin(0.5, 0.5);
    this.displayStats(100, 90);
  }
}

export default GameOverWin;

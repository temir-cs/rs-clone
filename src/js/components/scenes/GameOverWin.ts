import GameOver from './GameOver';
import { SceneConfig } from '../interfaces/interfaces';
import { DEFAULT_LEVEL,
  WIN_MUSIC_VOLUME_LEVEL,
  WIN_BG_SCALE,
  WIN_BG_Y_SHIFT,
  WIN_STATS_X,
  WIN_STATS_Y } from './consts';

class GameOverWin extends GameOver {
  constructor(config:SceneConfig) {
    super(config, 'GameOverWin');
  }

  create():void {
    super.create();
    this.music = this.sound.add('game-win', { volume: WIN_MUSIC_VOLUME_LEVEL });
    this.music.play();
    this.registry.set('level', DEFAULT_LEVEL);
    this.add.image(0, 0, 'win-bg').setScale(WIN_BG_SCALE).setOrigin(0, 0);
    this.add.image(this.screenCenter[0], this.screenCenter[1] - WIN_BG_Y_SHIFT, 'finish-game')
      .setOrigin(0.5, 0.5);
    this.displayStats(WIN_STATS_X, WIN_STATS_Y);
  }
}

export default GameOverWin;

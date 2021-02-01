import GameOver from './GameOver';
import { SceneConfig } from '../interfaces/interfaces';
import { FAIL_MUSIC_VOLUME_LEVEL,
  FAIL_BG_Y_SHIFT,
  FAIL_STATS_X,
  FAIL_STATS_Y } from './consts';

class GameOverFail extends GameOver {
  xtraLargeFont: number;
  constructor(config:SceneConfig) {
    super(config, 'GameOverFail');
    this.xtraLargeFont = 64;
  }

  create():void {
    super.create();
    this.music = this.sound.add('game-over', { volume: FAIL_MUSIC_VOLUME_LEVEL });
    this.music.play();
    this.add.image(0, 0, 'game-over').setOrigin(0, 0);
    this.add.text(this.screenCenter[0], this.screenCenter[1] - FAIL_BG_Y_SHIFT, 'GAME OVER', this.getFontOptions(this.xtraLargeFont))
      .setOrigin(0.5, 0.5);
    this.displayStats(FAIL_STATS_X, FAIL_STATS_Y);
  }
}

export default GameOverFail;

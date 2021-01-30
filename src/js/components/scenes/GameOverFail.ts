import GameOver from './GameOver';
import { SceneConfig } from '../interfaces/interfaces';

class GameOverFail extends GameOver {
  xtraLargeFont: number;
  constructor(config:SceneConfig) {
    super(config, 'GameOverFail');
    this.xtraLargeFont = 64;
  }

  create():void {
    super.create();
    this.music = this.sound.add('game-over', { volume: 1 });
    this.music.play();
    this.add.image(0, 0, 'game-over').setOrigin(0, 0);
    this.add.text(this.screenCenter[0], this.screenCenter[1] - 180, 'GAME OVER', this.getFontOptions(this.xtraLargeFont))
      .setOrigin(0.5, 0.5);
    this.displayStats(100, 0);
  }
}

export default GameOverFail;

import BaseScene from './BaseScene';
import { SceneConfig } from '../interfaces/interfaces';

import {
  HIGHSCORE_HEADER_X,
  HIGHSCORE_HEADER_Y,
  HIGHSCORE_LINE_SHIFT,
  HIGHSCORE_MAX_LINES_COUNT,
  SCORE_COIN_VALUE,
  SCORE_KILL_VALUE,
  SCORE_LVL_VALUE
} from './consts';

class Highscore extends BaseScene {
  scores: { username: string; score: number }[];
  constructor(config: SceneConfig) {
   super('HighscoreScene', { ...config, canGoBack: true });
    this.scores = [];
  }

  create():void {
    super.create();

    this.add.bitmapText(HIGHSCORE_HEADER_X, HIGHSCORE_HEADER_Y, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    this.getScores();
  }

  createHighscore():void {
    for (let i = 1; i < HIGHSCORE_MAX_LINES_COUNT; i++) {
      if (this.scores[i - 1]) {
        this.add.bitmapText(HIGHSCORE_HEADER_X, HIGHSCORE_HEADER_Y + HIGHSCORE_LINE_SHIFT + HIGHSCORE_LINE_SHIFT * i, 'arcade',
                  ` ${i}      ${this.scores[i - 1].score}    ${this.scores[i - 1].username}`).setTint(0xffffff);
      } else {
        this.add.bitmapText(HIGHSCORE_HEADER_X, HIGHSCORE_HEADER_Y + HIGHSCORE_LINE_SHIFT + HIGHSCORE_LINE_SHIFT * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
      }
    }
  }

  getScores():void {
    fetch('https://rscloneapi.herokuapp.com/leaderboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.scores = data.map((item) => {
           console.log('SERVER SCOREs', item);
          const score = item.coins * SCORE_COIN_VALUE + item.kills * SCORE_KILL_VALUE + item.level * SCORE_LVL_VALUE;
          return { username: item.username, score };
        });
        this.scores.sort((a, b) => b.score - a.score);
        this.createHighscore();
      });
  }
}

export default Highscore;

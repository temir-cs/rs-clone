import BaseScene from './BaseScene';

class Highscore extends BaseScene {
  scores: any[];
  constructor(config) {
   super('HighscoreScene', { ...config, canGoBack: true });
    this.scores = [];
  }

  create() {
    super.create();

    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    this.getScores();
  }

  createHighscore() {
    for (let i = 1; i < 8; i++) {
      if (this.scores[i - 1]) {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${this.scores[i - 1].score}    ${this.scores[i - 1].username}`).setTint(0xffffff);
      } else {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
      }
    }
  }

  getScores() {
    fetch('https://rscloneapi.herokuapp.com/leaderboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.scores = data.map((item) => {
          const score = item.coins * 10 + item.kills * 20 + item.levels * 30;
          return { username: item.username, score };
        });
        this.createHighscore();
      });
  }
}

export default Highscore;

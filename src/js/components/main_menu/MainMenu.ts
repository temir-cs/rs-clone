class MainMenu {
  html: string;
  container: HTMLElement;
  leaderboardLink: HTMLElement;
  toPlayLink: HTMLElement;
  startGame: any;
  username: string;
  constructor(startGame) {
    this.startGame = startGame;
    this.container = document.body;
    this.html = `
    <div id="menu-wrapper">
      <a id="to-play">To play</a>
      <a id="leaderboard">Leaderboard</a>
      <a href="#">About development</a>
    </div>`;
  }

  init(username?:string):void {
    if (username) {
          this.username = username;
    }
    this.container.innerHTML = this.html;
    this.toPlayLink = document.querySelector('#to-play');
    this.leaderboardLink = document.querySelector('#leaderboard');
    this.initLinkListeners();
  }

  initLinkListeners():void {
    this.toPlayLink.addEventListener('click', () => {
      this.remove();
      this.startGame(this.username);
    });
    this.leaderboardLink.addEventListener('click', async () => {
      console.log("asd");
      
      const results = await fetch('https://rscloneapi.herokuapp.com/leaderboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());
      this.remove();
      this.renderLeaderboard(results);
    });
  }

  renderLeaderboard(data) {
    const scores = data.map((item) => {
      const score = item.coins * 10 + item.kills * 20 + item.levels * 30;
      return { username: item.username, score };
    });
    const leaderboard = document.createElement('div');
    leaderboard.id = 'leaderboard';
    const table = document.createElement('table');
    leaderboard.innerHTML = '<h3>Best scores</h3>';
    leaderboard.append(table);
    scores.sort((a, b) => b.score - a.score);
    scores.forEach((el) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${el.username}</td>
      <td>${el.score}</td>`;
      table.append(row);
    });
    const backLink = document.createElement('a');
    backLink.innerText = 'Back';
    backLink.addEventListener('click', () => {
      this.remove();
      this.init();
    });
    leaderboard.append(backLink);
    this.container.append(leaderboard);
  }

  remove() {
    this.container.innerHTML = '';
  }
}

export default MainMenu;

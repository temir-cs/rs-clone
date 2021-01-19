class MainMenu {
  html: string;
  container: HTMLElement;
  leaderboardLink: any;
  toPlayLink: any;
  startGame: any;
  constructor(startGame) {
    this.startGame = startGame;
    this.container = document.body;
    this.html = `
      <a id="to-play">To play</a>
      <a id="leaderboard">Leaderboard</a>
      <a href="#">About development</a>`;
  }

  init(username) {
    this.container.innerHTML = this.html;
    this.toPlayLink = document.querySelector('#to-play');
    this.leaderboardLink = document.querySelector('#leaderboard');
    this.initLinkListeners();
  }

  initLinkListeners(){

  }

  remove() {
    this.container.innerHTML = '';
  }
}

export default MainMenu;

class Login {
  form: string;
  container: HTMLElement;
  game: any;
  constructor(game) {
    this.game = game;
    this.container = document.body;
    this.form = ` 
      <form id="login-form">
        <input type="text" name="username" id="username" required>
        <input type="password" name="password" id="password" required>
        <input type="submit" value="Login">
      </form>
      <a id="go-to-register">You are not regitered yet?</a>`;
  }

  init() {
    this.container.innerHTML = this.form;
    const formElement = document.querySelector('#login-form');
    const usernameField = (<HTMLInputElement>document.getElementById('username'));
    const passwordField = (<HTMLInputElement>document.getElementById('password'));
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = usernameField.value;
      const password = passwordField.value;

      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          this.removeForm(usernameField, passwordField);
          this.game();
        } else {
          console.log(data);
        }
      });
    });
  }

  removeForm(userElem, passElem) {
    userElem.value = '';
    passElem.value = '';
    this.container.innerHTML = '';
  }
}

export default Login;

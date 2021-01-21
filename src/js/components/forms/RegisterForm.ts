import Login from './LoginForm';

class Register {
  form: string;
  container: HTMLElement;
  startGame: any;
  loginForm: any;
  usernameField: HTMLInputElement;
  passwordField: HTMLInputElement;
  warnTimeout: number;
  constructor(startGame) {
    this.startGame = startGame;
    this.container = document.body;
    this.warnTimeout = 2000;
    this.form = `
    <div class="form__container">
      <h3 class="form__title">Registration</h3>
      <form id="reg-form" class="form__form">
        <span id="message"></span>
        <input class="form__input" type="text" name="username" id="username" required>
        <input class="form__input" type="password" name="password" id="password" required>
        <input class="form__btn" type="submit" value="Register">
      </form>
      <a id="go-to-login" class="form__link">You already have a login?</a>
      </div>`;
  }

  init() {
    this.loginForm = new Login(this.startGame, this);
    this.container.innerHTML = this.form;
    const formElement = document.querySelector('#reg-form');
    const linkToLogin = document.querySelector('#go-to-login');
    this.usernameField = (<HTMLInputElement>document.getElementById('username'));
    this.passwordField = (<HTMLInputElement>document.getElementById('password'));

    linkToLogin.addEventListener('click', () => {
      this.removeForm();
      this.loginForm.init();
    });
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.querySelector('#message');
      const username = this.usernameField.value;
      const password = this.passwordField.value;
      if (/\s/.test(username) || /[а-яА-ЯЁё]/.test(username)) {
        message.innerHTML = 'Username shouldn`t contain any kind of spaces or cyrillic charachters';
        setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        return;
      }

      if (/\s/.test(password) || /[а-яА-ЯЁё]/.test(password)) {
        message.innerHTML = 'Password shouldn`t contain any kind of spaces or cyrillic charachters';
        setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        return;
      }
      fetch('https://rscloneapi.herokuapp.com/users', {
        method: 'POST',
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
          this.removeForm();
          localStorage.setItem('user', username);
          this.startGame(username);
        } else {
          console.log(data);
          message.innerHTML = 'This username already taken please try another one';
          setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        }
      })
      .catch((err) => {
        message.innerHTML = 'Something went wrong';
        setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
      });
    });
  }

  removeForm():void {
    this.usernameField.value = '';
    this.passwordField.value = '';
    this.container.innerHTML = '';
  }
}

export default Register;

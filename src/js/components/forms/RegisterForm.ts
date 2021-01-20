import Login from './LoginForm';

class Register {
  form: string;
  container: HTMLElement;
  mainMenu: any;
  loginForm: any;
  usernameField: HTMLInputElement;
  passwordField: HTMLInputElement;
  warnTimeout: number;
  constructor(mainMenu) {
    this.mainMenu = mainMenu;
    this.container = document.body;
    this.warnTimeout = 2000;
    this.form = ` 
      <form id="reg-form">
        <span id="message"></span>
        <input type="text" name="username" id="username" required>
        <input type="password" name="password" id="password" required>
        <input type="submit" value="Register">
      </form>
      <a id="go-to-login">You already have a login?</a>`;
  }

  init() {
    this.loginForm = new Login(this.mainMenu, this);
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

      if (/\s/.test(password)|| /[а-яА-ЯЁё]/.test(password)) {
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
          this.mainMenu.init(username);
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

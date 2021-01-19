class Login {
  form: string;
  container: HTMLElement;
  mainMenu: any;
  usernameField: HTMLInputElement;
  passwordField: HTMLInputElement;
  regForm: any;
  constructor(mainMenu, regForm) {
    this.mainMenu = mainMenu;
    this.regForm = regForm;
    this.container = document.body;
    this.form = ` 
      <form id="login-form">
        <input type="text" name="username" id="username" required>
        <input type="password" name="password" id="password" required>
        <input type="submit" value="Login">
      </form>
      <a id="go-to-register">You are not regitered yet?</a>`;
  }

  init():void {
    this.container.innerHTML = this.form;
    const formElement = document.querySelector('#login-form');
    const linkToRegister = document.querySelector('#go-to-register');
    this.usernameField = (<HTMLInputElement>document.getElementById('username'));
    this.passwordField = (<HTMLInputElement>document.getElementById('password'));
    linkToRegister.addEventListener('click', () => {
      this.removeForm();
      this.regForm.init();
    });

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.querySelector('#message');
      const username = this.usernameField.value;
      const password = this.passwordField.value;
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
          this.removeForm();
          localStorage.setItem('user', username);
          this.mainMenu.init(username);
        } else {
          console.log(data);
          message.innerHTML = 'User with this credentials doesn`t exists';
          setTimeout(() => { message.innerHTML = ''; }, 1000);
        }
      })
      .catch((err) => {
        message.innerHTML = 'Something went wrong';
        setTimeout(() => { message.innerHTML = ''; }, 1000);
      });
    });
  }

  removeForm():void {
    this.usernameField.value = '';
    this.passwordField.value = '';
    this.container.innerHTML = '';
  }
}

export default Login;

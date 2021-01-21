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
    <div class="form__container">
    <h3 class="form__title">Authorization</h3>
       <form id="login-form"  class="form__form">
        <input class="form__input" type="text" name="username" id="username" required>
        <input class="form__input" type="password" name="password" id="password" required>
        <input class="form__btn" type="submit" value="Login">
      </form>
      <a id="go-to-register" class="form__link">You are not regitered yet?</a>
    </div>
`;
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
      fetch('https://rscloneapi.herokuapp.com/user', {
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
        console.log(data);
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
        console.log(err);

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

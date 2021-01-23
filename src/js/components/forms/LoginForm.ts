class Login {
  form: string;
  container: HTMLElement;
  constructor() {
    this.container = document.body;
    this.form = `
    <div class="form__container">
    <h3 class="form__title">Authorization</h3>
       <form id="login-form"  class="form__form">
        <span id="message"></span>
        <input class="form__input" type="text" name="username" id="username" required>
        <input class="form__input" type="password" name="password" id="password" required>
        <a href="#signin" class="form__btn">Sign In</a>
      </form>
      <a href="#register" id="go-to-register" class="form__link">You are not regitered yet?</a>
    </div>
`;
  }

  init():void {
    this.container.innerHTML = this.form;
  }

  removeForm():void {
    this.container.innerHTML = '';
  }
}

export default Login;

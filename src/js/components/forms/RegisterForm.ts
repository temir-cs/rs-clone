class Register {
  form: string;
  container: HTMLElement;
  constructor() {
    this.container = document.body;
    this.form = `
    <div class="form__container">
      <h3 class="form__title">Registration</h3>
      <form id="reg-form" class="form__form">
        <span id="message"></span>
        <input class="form__input" type="text" name="username" id="username" required>
        <input class="form__input" type="password" name="password" id="password" required>
        <a href="#signup" class="form__btn">Sign Up</a>
      </form>
      <a href="#login" id="go-to-login" class="form__link">You already have a login?</a>
      </div>`;
  }

  init() {
    this.container.innerHTML = this.form;
  }

  removeForm():void {
    this.container.innerHTML = '';
  }
}

export default Register;

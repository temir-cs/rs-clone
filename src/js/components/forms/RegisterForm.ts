class Register {
  form: string;
  container: HTMLElement;
  mainText: HTMLElement;
  constructor() {
    this.mainText = document.querySelector('.content__var');
    this.container = document.querySelector('.form__container');
    this.form = `
    <form id="reg-form" class="form__form">
      <span id="message" class="form__msg"></span>
      <input class="form__input" type="text" name="username" id="username" required>
      <input class="form__input" type="password" name="password" id="password" required>
      <a href="#signup" class="form__btn">Sign Up</a>
    </form>
    <a href="#login" id="go-to-login" class="form__link">Already have a login?</a>`;
  }

  init() {
    this.mainText.innerText = 'Регистрируйся и поехали!';
    this.container.innerHTML = this.form;
  }

//   removeForm():void {
    // this.container.innerHTML = '';

//   }
}

export default Register;

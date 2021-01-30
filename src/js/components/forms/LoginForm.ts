import { getCurrentLanguageDictionary } from '../utils/functions';

class Login {
  form: string;
  container: HTMLElement;
  mainText: HTMLElement;
  dictionary: any;
  constructor() {
    this.dictionary = getCurrentLanguageDictionary();
    this.mainText = document.querySelector('.content__var');
    this.container = document.querySelector('.form__container');
    this.form = `
       <form id="login-form"  class="form__form">
        <span id="message" class="form__msg"></span>
        <input class="form__input" type="text" name="username" id="username" required>
        <input class="form__input" type="password" name="password" id="password" required>
        <a href="#signin" class="form__btn">Sign In</a>
      </form>
      <a href="#register" id="go-to-register" class="form__link">${this.dictionary.WelcomeScreen.firstTime}</a>
`;
  }

  init():void {
    this.mainText.innerText = `${this.dictionary.WelcomeScreen.firstTime}`;
    this.container.innerHTML = this.form;
  }

  // removeForm():void {
  //   this.container.innerHTML = '';
  // }
}

export default Login;

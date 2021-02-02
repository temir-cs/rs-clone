import { getCurrentLanguageDictionary } from '../utils/functions';
import {
  JSONRU,
  JSONEN
} from '../interfaces/interfaces';

class Register {
  form: string;
  container: HTMLElement;
  mainText: HTMLElement;
  dictionary: JSONRU | JSONEN;
  constructor() {
    this.dictionary = getCurrentLanguageDictionary();
    this.form = `
    <form id="reg-form" class="form__form">
      <span id="message" class="form__msg"></span>
      <input class="form__input" type="text" name="username" id="username" required>
      <input class="form__input" type="password" name="password" id="password" required>
      <a href="#signup" class="form__btn">${this.dictionary.WelcomeScreen.signUpBtn}</a>
    </form>
    <a href="#login" id="go-to-login" class="form__link">${this.dictionary.WelcomeScreen.haveLogin}</a>`;
  }

  init():void {
    this.mainText = document.querySelector('.content__var');
    this.container = document.querySelector('.form__container');
    this.mainText.innerText = `${this.dictionary.WelcomeScreen.regAndGo}`;
    this.container.innerHTML = this.form;
  }
}

export default Register;

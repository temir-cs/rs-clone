import * as lang from '../../../assets/lang/lang.json';
import { chooseLang } from '../utils/functions';

class Register {
  form: string;
  container: HTMLElement;
  mainText: HTMLElement;
  enOrRu: any;
  constructor() {
    this.enOrRu = chooseLang(lang);
    this.form = `
    <form id="reg-form" class="form__form">
      <span id="message" class="form__msg"></span>
      <input class="form__input" type="text" name="username" id="username" required>
      <input class="form__input" type="password" name="password" id="password" required>
      <a href="#signup" class="form__btn">Sign Up</a>
    </form>
    <a href="#login" id="go-to-login" class="form__link">${this.enOrRu.WelcomeScreen.haveLogin}</a>`;
  }

  init():void {
    this.mainText = document.querySelector('.content__var');
    this.container = document.querySelector('.form__container');
    this.mainText.innerText = `${this.enOrRu.WelcomeScreen.regAndGo}`;
    this.container.innerHTML = this.form;
  }
}

export default Register;

import * as lang from '../../../assets/lang/lang.json';
import { chooseLang } from '../utils/functions';

class MainScreen {
  content: { main: {text:string, form:string}, about: {text:string, form:string}, tutorial: {text:string, form:string},
  lang: {text:string, form:string}, article: {text:string, form:string};};

  textContainer: HTMLElement;
  formContainer: HTMLElement;
  constructor() {
    const enOrRu = chooseLang(lang);

    const tutorial = document.querySelector('.tutorial');
    tutorial.innerHTML = `${enOrRu.WelcomeScreen.howToPlay}`;

    const article = document.querySelector('.article');
    article.innerHTML = `${enOrRu.WelcomeScreen.article}`;

    const team = document.querySelector('.about');
    team.innerHTML = `${enOrRu.WelcomeScreen.team}`;

    const getLang = document.querySelector('.lang');
    getLang.innerHTML = `${enOrRu.WelcomeScreen.getLang}`;

    this.textContainer = document.querySelector('.content__text');
    this.formContainer = document.querySelector('.form__container');
    this.content = {
      main: {
        text: `
         ${enOrRu.WelcomeScreen.description}<span class="content__var"></span>
         `,
        form: `
          <a href="#game" class="form__btn">${enOrRu.WelcomeScreen.letsGo}</a>`
      },
      about: {
        text: `
        ${enOrRu.WelcomeScreen.teamText} `,
        form: `
          <a href="#main" class="form__btn">${enOrRu.WelcomeScreen.close}</a>`,
      },
      tutorial: {
        text: `
        ${enOrRu.WelcomeScreen.howToPlayText}`,
        form: `
          <a href="#main" class="form__btn">${enOrRu.WelcomeScreen.close}</a>`,
      },
      lang: {
        text: `
        ${enOrRu.WelcomeScreen.switchLang}`,
        form: `
          <a href="#main" class="form__btn">${enOrRu.WelcomeScreen.close}</a>`,
      },
      article: {
        text: `
          ${enOrRu.WelcomeScreen.articleText}`,
        form: `
          <a href="#main" class="form__btn">${enOrRu.WelcomeScreen.close}</a>`,
      }
    };
  }

  init(type: string):void {
    this.textContainer.innerHTML = this.content[type].text;
    this.formContainer.innerHTML = this.content[type].form;
  }
}

export default MainScreen;

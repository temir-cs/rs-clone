import { getCurrentLanguageDictionary } from '../utils/functions';

class MainScreen {
  content: { main: {text:string, form:string}, about: {text:string, form:string}, tutorial: {text:string, form:string},
  lang: {text:string, form:string}, article: {text:string, form:string};};

  textContainer: HTMLElement;
  formContainer: HTMLElement;
  constructor() {
    const dictionaty = getCurrentLanguageDictionary();

    const tutorial = document.querySelector('.tutorial');
    tutorial.innerHTML = `${dictionaty.WelcomeScreen.howToPlay}`;

    const article = document.querySelector('.article');
    article.innerHTML = `${dictionaty.WelcomeScreen.article}`;

    const team = document.querySelector('.about');
    team.innerHTML = `${dictionaty.WelcomeScreen.team}`;

    const getLang = document.querySelector('.lang');
    getLang.innerHTML = `${dictionaty.WelcomeScreen.getLang}`;

    this.textContainer = document.querySelector('.content__text');
    this.formContainer = document.querySelector('.form__container');
    this.content = {
      main: {
        text: `
         ${dictionaty.WelcomeScreen.description}<span class="content__var"></span>
         `,
        form: `
          <a href="#game" class="form__btn">${dictionaty.WelcomeScreen.letsGo}</a>`
      },
      about: {
        text: `
        ${dictionaty.WelcomeScreen.teamText} `,
        form: `
          <a href="#main" class="form__btn">${dictionaty.WelcomeScreen.close}</a>`,
      },
      tutorial: {
        text: `
        ${dictionaty.WelcomeScreen.howToPlayText}`,
        form: `
          <a href="#main" class="form__btn">${dictionaty.WelcomeScreen.close}</a>`,
      },
      lang: {
        text: `
        ${dictionaty.WelcomeScreen.switchLang}`,
        form: `
          <a href="#main" class="form__btn">${dictionaty.WelcomeScreen.close}</a>`,
      },
      article: {
        text: `
          ${dictionaty.WelcomeScreen.articleText}`,
        form: `
          <a href="#main" class="form__btn">${dictionaty.WelcomeScreen.close}</a>`,
      }
    };
  }

  init(type: string):void {
    this.textContainer.innerHTML = this.content[type].text;
    this.formContainer.innerHTML = this.content[type].form;
  }
}

export default MainScreen;

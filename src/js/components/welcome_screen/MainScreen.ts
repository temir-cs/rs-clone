import { getCurrentLanguageDictionary } from '../utils/functions';

type textStructureType = {
  text:string,
  form:string,
  addon?: string,
  popUp?: string
}

class MainScreen {
  content: { main: textStructureType, about: textStructureType, tutorial: textStructureType,
  lang: textStructureType, article: textStructureType};

  addonContainer: HTMLElement;
  textContainer: HTMLElement;
  formContainer: HTMLElement;
  popUp: HTMLElement;
  popUpText: HTMLElement;
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

    this.addonContainer = document.querySelector('.content__addon');
    this.textContainer = document.querySelector('.content__text');
    this.formContainer = document.querySelector('.form__container');
    this.popUp = document.querySelector('.popUp__overlay');
    this.popUpText = document.querySelector('.popUp__list');
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
        addon: `
        <ul class="team__list">
          <li class="team__item  team__item--01">
            <img class="team__img" src="./assets/img/welcome_screen/icon1.png">
            <p class="team__descr">
              <span class="team__subheader">${dictionaty.WelcomeScreen.teamMemberName01}</span>
              ${dictionaty.WelcomeScreen.teamMemberDescr01}
              </p>
          </li>
          <li class="team__item  team__item--02">
            <img class="team__img" src="./assets/img/welcome_screen/icon2.png">
            <p class="team__descr">
              <span class="team__subheader">${dictionaty.WelcomeScreen.teamMemberName02}</span>
              <span class="team__strikeout">${dictionaty.WelcomeScreen.teamMemberStriked}</span>
              ${dictionaty.WelcomeScreen.teamMemberDescr02}
            </p>
          </li>
          <li class="team__item  team__item--03">
            <img class="team__img" src="./assets/img/welcome_screen/icon3.png">
            <p class="team__descr">
              <span class="team__subheader">${dictionaty.WelcomeScreen.teamMemberName03}</span>
              ${dictionaty.WelcomeScreen.teamMemberDescr03}
            </p>
          </li>
          <li class="team__item  team__item--04">
            <img class="team__img" src="./assets/img/welcome_screen/icon4.png">
            <p class="team__descr">
              <span class="team__subheader">${dictionaty.WelcomeScreen.teamMemberName04}</span>
              ${dictionaty.WelcomeScreen.teamMemberDescr04}
            </p>
          </li>

        </ul>
        `
      },
      tutorial: {
        text: `
        ${dictionaty.WelcomeScreen.howToPlayText}
        <div class="content__controls  controls">
          <div class="controls__btn  controls__btn--01"></div>
          <div class="controls__btn  controls__btn--02"></div>
          <div class="controls__btn  controls__btn--03"></div>
          <div class="controls__btn  controls__btn--04"></div>
          <div class="controls__btn  controls__btn--05"></div>
          <div class="controls__img  controls__img--01"></div>
          <div class="controls__img  controls__img--02"></div>
          <div class="controls__img  controls__img--03"></div>
          <div class="controls__img  controls__img--04"></div>
          <div class="controls__img  controls__img--05"></div>
        </div>`,
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
          ${dictionaty.WelcomeScreen.articleText}
          <a class="content__link" href="#">${dictionaty.WelcomeScreen.articleLink}</a>
          <span class="content__link  content__link--small">${dictionaty.WelcomeScreen.articleCopyrightLink}</span>`,
        form: `
          <a href="#main" class="form__btn">${dictionaty.WelcomeScreen.close}</a>`,
        popUp: `
          <li class="popUp__item">${dictionaty.WelcomeScreen.articlePopUp01}:
            <a class="popUp__link" href="https://craftpix.net/" target="blank">Craftpix</a></li>
          <li class="popUp__item">${dictionaty.WelcomeScreen.articlePopUp02}:
            <a class="popUp__link" href="https://freesound.org/" target="blank">Freesound</a></li>
        `,
      }
    };
  }

  init(type: string):void {
    this.textContainer.innerHTML = this.content[type].text;
    this.addonContainer.innerHTML = (this.content[type].addon) ? this.content[type].addon : '';
    this.formContainer.innerHTML = this.content[type].form;

    if (type === 'article') {
      this.popUpText.innerHTML = this.content[type].popUp;
      const popUpLink = document.querySelector('.content__link--small');
      popUpLink.addEventListener('click', () => {
        this.openPopUp();
      });
    }
  }

  openPopUp():void {
    this.popUp.classList.remove('popUp__overlay--hidden');
    document.body.classList.add('stop-scrolling');

    const closeBtn = document.querySelector('.popUp__close');
    closeBtn.addEventListener('click', () => {
      this.hidePopUp();
    });

    const closeBtn2 = document.querySelector('.popUp__button');
    closeBtn2.addEventListener('click', () => {
      this.hidePopUp();
    });
  }

  hidePopUp():void {
    this.popUp.classList.add('popUp__overlay--hidden');
    document.body.classList.remove('stop-scrolling');
  }
}

export default MainScreen;

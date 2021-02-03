import {
  JSONRU,
  JSONEN
} from '../interfaces/interfaces';

const lang = require('../../../assets/lang/lang.json');

const getTimestamp = ():number => {
  const d = new Date();
  return d.getTime();
};

// const clearAllBeforeGame = ():void => {
//   // console.log('clear');
//   // const { body } = document;
//   // body.innerHTML = '<div id="game"></div>';
// };

// const hidContainer = (selector: string):void => {
//   const container = document.querySelector(selector);
//   if (!container.classList.contains('hidden')) {
//       container.classList.add('hidden');
//   }
// };

// const revealContainer = (selector: string):void => {
//   const container = document.querySelector(selector);
//   container.classList.remove('hidden');
// };

const closePopUp = ():void => {
  const popUp = document.querySelector('.popUp__overlay');
  if (!popUp.classList.contains('popUp__overlay--hidden')) {
    console.log('shown');
    popUp.classList.add('popUp__overlay--hidden');
  }
};

const showGame = ():void => {
  const header = document.querySelector('.page-header');
  const main = document.querySelector('.content');
  const footer = document.querySelector('.page-footer');
  const game = document.querySelector('#game');
  closePopUp();
  header.classList.add('visually-hidden');
  main.classList.add('visually-hidden');
  footer.classList.add('visually-hidden');
  game.classList.remove('visually-hidden');
};

const showSite = ():void => {
  const header = document.querySelector('.page-header');
  const main = document.querySelector('.content');
  const footer = document.querySelector('.page-footer');
  const game = document.querySelector('#game');
  closePopUp();
  if (header.classList.contains('visually-hidden')) {
    header.classList.remove('visually-hidden');
    main.classList.remove('visually-hidden');
    footer.classList.remove('visually-hidden');
    game.classList.add('visually-hidden');
  }
};

const mobileToggleMenu = ():void => {
  const toggle = document.querySelector('.page-header__toggle-btn');
  const menu = document.querySelector('.page-header__nav');
  const content = document.querySelector('.content');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('page-header__toggle-btn--open');
    menu.classList.toggle('page-header__nav--open');
    content.classList.toggle('content--open');
  });
};

const stopSpinner = ():void => {
  const loaderSpinner = document.querySelector('.loader');
  loaderSpinner.classList.add('loader--hidden');
};

const getCurrentLanguageDictionary = ():JSONRU | JSONEN => {
  const currentLang = localStorage.getItem('lang');
  return currentLang === 'RU' ? lang.RU : lang.EN;
};

export {
  getTimestamp,
  // clearAllBeforeGame,
  // hidContainer,
  // revealContainer,
  closePopUp,
  showGame,
  showSite,
  mobileToggleMenu,
  stopSpinner,
  getCurrentLanguageDictionary
};

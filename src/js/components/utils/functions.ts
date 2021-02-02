import {
  JSONRU,
  JSONEN
} from '../interfaces/interfaces';

const lang = require('../../../assets/lang/lang.json');

const getTimestamp = ():number => {
  const d = new Date();
  return d.getTime();
};

const clearAllBeforeGame = ():void => {
  // console.log('clear');
  // const { body } = document;
  // body.innerHTML = '<div id="game"></div>';
};

const hidContainer = (selector: string):void => {
  const container = document.querySelector(selector);
  if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
  }
};

const revealContainer = (selector: string):void => {
  const container = document.querySelector(selector);
  container.classList.remove('hidden');
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
  clearAllBeforeGame,
  hidContainer,
  revealContainer,
  mobileToggleMenu,
  stopSpinner,
  getCurrentLanguageDictionary
};

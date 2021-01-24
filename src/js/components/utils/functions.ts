const getTimestamp = ():any => {
  const d = new Date();
  return d.getTime();
};

const clearAllBeforeGame = ():void => {
  console.log('clear');
  const { body } = document;
  body.innerHTML = '<div id="game"></div>';
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

export {
  getTimestamp,
  clearAllBeforeGame,
  mobileToggleMenu,
};

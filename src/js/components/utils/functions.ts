const getTimestamp = ():any => {
  const d = new Date();
  return d.getTime();
};

const clearAllBeforeGame = ():void => {
  console.log('clear');
  const { body } = document;
  body.innerHTML = '<div id="game"></div>';
};

const stopSpinner = ():void => {
  const loaderSpinner = document.querySelector('.loader');
  loaderSpinner.classList.add('loader--hidden');
};

export {
  getTimestamp,
  clearAllBeforeGame,
  stopSpinner
};

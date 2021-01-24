const getTimestamp = ():any => {
  const d = new Date();
  return d.getTime();
};

const clearAllBeforeGame = ():void => {
  console.log('clear');
  const { body } = document;
  body.innerHTML = '<div id="game"></div>';
};

export {
  getTimestamp,
  clearAllBeforeGame
};

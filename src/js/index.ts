import gameStart from './game';

import Register from './components/forms/RegisterForm';

// import MainMenu from './components/main_menu/MainMenu';

// const mainMenu = new MainMenu(gameStart);
const registerForm = new Register(gameStart);

const user = localStorage.getItem('user');
if (user) {
  gameStart(user);
} else {
  registerForm.init();
}

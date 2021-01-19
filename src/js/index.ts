import gameStart from './game';

import Login from './components/Forms/LoginForm';

import Register from './components/Forms/RegisterForm';

const user = localStorage.getItem('user');
const LoginForm = new Login(gameStart);
const registerForm = new Register(gameStart, LoginForm);

if (user) {
  gameStart(user);
} else {
  registerForm.init();
}

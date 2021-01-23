import gameStart from './game';

import Routes from './components/routes/Routes';

const router = new Routes(gameStart);
const user = localStorage.getItem('user');
if (user) {
  gameStart();
} else {
  router.init();
}

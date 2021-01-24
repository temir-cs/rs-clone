import gameStart from './game';

import Routes from './components/routes/Routes';
import { clearAllBeforeGame } from './components/utils/functions';

const router = new Routes(gameStart);
const user = localStorage.getItem('user');
if (user) {
  clearAllBeforeGame();
  gameStart();
} else {
  router.init();
}

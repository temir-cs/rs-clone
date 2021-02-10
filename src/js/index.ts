import gameStart from './game';

import Routes from './components/routes/Routes';
import { stopSpinner } from './components/utils/functions';

const router = new Routes(gameStart);
const user = localStorage.getItem('user');

router.init();

stopSpinner();

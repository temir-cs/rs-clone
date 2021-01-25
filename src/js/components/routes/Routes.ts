import Register from '../forms/RegisterForm';
import Login from '../forms/LoginForm';
import MainScreen from '../welcome_screen/MainScreen';
import { requestToServer, getCredentials } from './utils';
import { clearAllBeforeGame,
          mobileToggleMenu } from '../utils/functions';

class Routes {
  routes: { login: Login, register: Register; };
  startHash: string;
  credentials: any;
  gameStart: any;
  warnTimeout: number;
  warn: string;
  mainScreen: MainScreen;
  constructor(gameStart) {
    this.mainScreen = new MainScreen();
    this.gameStart = gameStart;
    this.warnTimeout = 2000;
    this.warn = 'Username shouldn`t contain any kind of spaces or cyrillic characters';
  }

  init() {
    window.addEventListener('hashchange', (event) => this.onRouteChange(event));
    this.refreshHash();
    this.mainScreen.init('main');
    this.routes = {
      login: new Login(),
      register: new Register()
    };
    mobileToggleMenu();
  }

  renderRegForm() {
    this.refreshHash('register');
  }

  refreshHash(path = 'main'):void {
    // window.location.hash = '';
    window.location.hash = `#${path}`;
  }

  onRouteChange(event) {
    const hashLocation = window.location.hash.substring(1);
    if (hashLocation === 'game') {
      clearAllBeforeGame();
      this.gameStart();
    } else if (hashLocation === 'main') {
      this.mainScreen.init(hashLocation);
      const user = localStorage.getItem('user');
      if (!user) {
        this.renderRegForm();
      }
    } else if (hashLocation === 'tutorial' || hashLocation === 'about') {
      this.mainScreen.init(hashLocation);
    } else if (hashLocation === 'login' || hashLocation === 'register') {
      this.routes[hashLocation].init();
    } else if (hashLocation === 'signup' || hashLocation === 'signin') {
      const message = document.querySelector('#message');
      const path = hashLocation === 'signup' ? 'register' : 'login';
      const credentials = getCredentials();

      if (/\s/.test(credentials.username) || /[а-яА-ЯЁё]/.test(credentials.username) || credentials.username.length === 0) {
        message.innerHTML = this.warn;
        setTimeout(() => {
          message.innerHTML = '';
          this.refreshHash(path);
        }, this.warnTimeout);
        return;
      }

      if (/\s/.test(credentials.password) || /[а-яА-ЯЁё]/.test(credentials.password) || credentials.password.length === 0) {
        message.innerHTML = this.warn;
        setTimeout(() => {
          message.innerHTML = '';
          this.refreshHash(path);
        }, this.warnTimeout);
        return;
      }
      (async () => {
        const responseData = await requestToServer(credentials, hashLocation);
        if (responseData.status === 'ok') {
          // this.routes[path].removeForm();
          localStorage.setItem('user', credentials.username);
          this.refreshHash('game');
        } else if (hashLocation === 'signup') {
          message.innerHTML = 'This username already taken please try another one';
          setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        } else {
          message.innerHTML = 'User with this credentials doesn`t exists';
          setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        }
      })();
    } else {
      this.refreshHash();
    }
  }
}

export default Routes;

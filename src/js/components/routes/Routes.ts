import Register from '../forms/RegisterForm';
import Login from '../forms/LoginForm';
import MainScreen from '../welcome_screen/MainScreen';
import { requestToServer, getCredentials } from './utils';
import { clearAllBeforeGame,
          hidContainer,
          revealContainer,
          mobileToggleMenu,
          getCurrentLanguageDictionary } from '../utils/functions';

const WARN_TIMEOUT = 2000;

class Routes {
  routes: { login: Login, register: Register; };
  startHash: string;
  credentials: any;
  gameStart: any;
  warnTimeout: number;
  warn: string;
  mainScreen: MainScreen;
  game: any;
  constructor(gameStart) {
    const dictionary = getCurrentLanguageDictionary();
    this.mainScreen = new MainScreen();
    this.gameStart = gameStart;
    this.warnTimeout = WARN_TIMEOUT;
    this.warn = `${dictionary.WelcomeScreen.usernameWarning}`;
  }

  init() {
    window.addEventListener('hashchange', (event) => this.onRouteChange(event));
    this.refreshHash();
    this.mainScreen.init('main');
    this.routes = {
      login: new Login(),
      register: new Register()
    };
    this.game = this.gameStart();
    mobileToggleMenu();
  }

  renderRegForm() {
    this.refreshHash('register');
  }

  refreshHash(path = 'main'):void {
    window.location.hash = `#${path}`;
  }

  onRouteChange(event) {
    const dictionary = getCurrentLanguageDictionary();
    const hashLocation = window.location.hash.substring(1);
    if (hashLocation === 'game') {
      hidContainer('.main-container');
      revealContainer('#game');
    } else if (hashLocation === 'main') {
      revealContainer('.main-container');
      hidContainer('#game');
      this.mainScreen.init(hashLocation);
      const user = localStorage.getItem('user');
      if (!user) {
        this.renderRegForm();
      }
    } else if (hashLocation === 'tutorial' || hashLocation === 'about' || hashLocation === 'article') {
      this.mainScreen.init(hashLocation);
    } else if (hashLocation === 'lang') {
      this.mainScreen.init(hashLocation);
      if (localStorage.getItem('lang') !== null) {
        localStorage.removeItem('lang');
      } else {
        localStorage.setItem('lang', 'RU');
      }
      window.location.reload();
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
          message.innerHTML = `${dictionary.WelcomeScreen.usernameTakenWarning}`;
          setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        } else {
          message.innerHTML = `${dictionary.WelcomeScreen.userDoesNotExistWarning}`;
          setTimeout(() => { message.innerHTML = ''; }, this.warnTimeout);
        }
      })();
    } else {
      this.refreshHash();
    }
  }
}

export default Routes;

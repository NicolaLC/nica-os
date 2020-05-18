import {Application} from '../interfaces';
import {WelcomeComponent} from './welcome.component';
import {ConsoleComponent} from './console.component';
import {BrowserComponent} from './browser.component';

const console = new Application({
  title: 'Console',
  component: 'ConsoleComponent',
  icon: 'console',
  iconContrast: 'consoleContrast',
  startPosition: {x: '200px', y: '200px'},
  size: {width: '500px', height: '300px'}
});
const welcome = new Application({
  title: 'Welcome',
  component: 'WelcomeComponent',
  icon: 'home',
  iconContrast: 'homeContrast',
  size: {width: '1000px', height: '800px'}
});

const browser_spaceInvaders = new Application({
  title: 'PLAY Space Invaders',
  component: 'BrowserComponent',
  icon: 'spaceinvaders',
  iconContrast: 'spaceinvadersGreen',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicolalc.github.io/jssheet/spaceinvaders/index.html' }
});

const browser_helloUnity = new Application({
  title: 'Hello Unity',
  component: 'BrowserComponent',
  icon: 'unity',
  iconContrast: 'unityGreen',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicawd.herokuapp.com/unity-demo' }
});
export const APPLICATIONS: { [key: string]: Application } = {
  console,
  welcome,
  browser_spaceInvaders,
  browser_helloUnity
};


export const applicationMapping = {
  'WelcomeComponent': WelcomeComponent,
  'ConsoleComponent': ConsoleComponent,
  'BrowserComponent': BrowserComponent
};

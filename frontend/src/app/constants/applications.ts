import {ConsoleComponent} from '@applications/console.component';
import {BrowserComponent} from '@applications/browser.component';
import {FileExplorerComponent} from '@applications/file-explorer/file-explorer.component';
import {Application, APPLICATION_CATEGORY} from '@interfaces/interfaces';
import {WelcomeComponent} from '@applications/welcome.component';
import {fs} from '@constants/filesystem';

const explorer = new Application({
  title: 'File explorer',
  component: 'FileExplorerComponent',
  icon: 'folderIcon',
  iconContrast: 'folderIcon',
  size: {width: '1200px', height: '1000px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('desktop')
    ]
  }
});

const console = new Application({
  title: 'Console',
  component: 'ConsoleComponent',
  icon: 'console',
  iconContrast: 'consoleContrast',
  startPosition: {x: '200px', y: '200px'},
  size: {width: '500px', height: '300px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('utilities'),
      fs.getPath('desktop')
    ]
  }
});

const welcome = new Application({
  title: 'Welcome',
  component: 'WelcomeComponent',
  icon: 'home',
  iconContrast: 'homeContrast',
  size: {width: '1000px', height: '800px'},
  fs: {
    category: APPLICATION_CATEGORY.INFO,
    paths: [
      fs.getPath('info')
    ]
  }
});

const browser_spaceInvaders = new Application({
  title: 'PLAY Space Invaders',
  component: 'BrowserComponent',
  icon: 'spaceinvaders',
  iconContrast: 'spaceinvadersGreen',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicolalc.github.io/jssheet/spaceinvaders/index.html' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const browser_helloUnity = new Application({
  title: 'Hello Unity',
  component: 'BrowserComponent',
  icon: 'unity',
  iconContrast: 'unityGreen',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicawd.herokuapp.com/unity-demo' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

export const APPLICATIONS: { [key: string]: Application } = {
  console,
  welcome,
  browser_spaceInvaders,
  browser_helloUnity,
  explorer
};


export const applicationMapping = {
  'WelcomeComponent': WelcomeComponent,
  'ConsoleComponent': ConsoleComponent,
  'BrowserComponent': BrowserComponent,
  'FileExplorerComponent': FileExplorerComponent
};

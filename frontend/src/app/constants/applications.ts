import {ConsoleComponent} from '@applications/console.component';
import {BrowserComponent} from '@applications/browser.component';
import {FileExplorerComponent} from '@applications/file-explorer/file-explorer.component';
import {Application, APPLICATION_CATEGORY} from '@interfaces/interfaces';
import {WelcomeComponent} from '@applications/welcome.component';
import {fs} from '@constants/filesystem';
import {TextEditorComponent} from '@applications/text-editor/text-editor.component';
import {KnightsAndMonstersComponent} from '@applications/knights-and-monsters/knights-and-monsters.component';
import {RandomNameGeneratorComponent} from '@applications/random-name-generator/random-name-generator';

const explorer = new Application({
  title: 'File explorer',
  component: 'FileExplorerComponent',
  alt: 'View files and applications',
  icon: 'folderIcon',
  iconContrast: 'folderIcon',
  size: {width: '1200px', height: '1000px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('desktop'),
      fs.getPath('applications'),
      fs.getPath('utilities')
    ]
  }
});

const textEditor = new Application({
  title: 'Text editor',
  component: 'TextEditorComponent',
  alt: 'Text editor app',
  icon: 'textEditorIcon',
  iconContrast: 'textEditorIcon',
  fullScreen: true,
  size: {width: '1200px', height: '1000px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('desktop'),
      fs.getPath('applications'),
      fs.getPath('utilities')
    ]
  }
});

const console = new Application({
  title: 'Console',
  component: 'ConsoleComponent',
  alt: 'A simple console wich displays a part of redux state changes',
  icon: 'console',
  iconContrast: 'console',
  startPosition: {x: '200px', y: '200px'},
  size: {width: '500px', height: '300px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('utilities'),
      fs.getPath('applications'),
      fs.getPath('desktop')
    ]
  }
});

const welcome = new Application({
  title: 'Welcome',
  component: 'WelcomeComponent',
  alt: 'Who is Nicola Castellani?',
  icon: 'home',
  iconContrast: 'home',
  size: {width: '1000px', height: '800px'},
  fs: {
    category: APPLICATION_CATEGORY.INFO,
    paths: [
      fs.getPath('applications'),
      fs.getPath('desktop'),
      fs.getPath('info')
    ]
  }
});

const browser_spaceInvaders = new Application({
  title: 'PLAY Space Invaders',
  alt: 'Play now SpaceInvaders JS, a personal project created using typescript and three js!',
  component: 'BrowserComponent',
  icon: 'spaceinvaders',
  iconContrast: 'spaceinvaders',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicolalc.github.io/jssheet/spaceinvaders/index.html' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('applications'),
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const browser_helloUnity = new Application({
  title: 'Hello Unity',
  component: 'BrowserComponent',
  alt: 'Take a look to an example of Unity3D webgl export and templating',
  icon: 'unity',
  iconContrast: 'unity',
  size: {width: '1200px', height: '1000px'},
  data: { url: 'https://nicawd.herokuapp.com/unity-demo' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('applications'),
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const browser_polyGone = new Application({
  title: 'Poly Gone',
  component: 'BrowserComponent',
  alt: 'A 3-match game I\'ve made for my Master Game Development Mobile course',
  icon: 'polygone_logo',
  iconContrast: 'polygone_logo',
  fullScreen: true,
  size: {width: '720px', height: '1280px'},
  data: { url: 'assets/static/webgl/polygone/index.html' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('applications'),
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const browser_autoBattler = new Application({
  title: 'AutoBattler!',
  component: 'BrowserComponent',
  alt: 'A full mobile game made for MasterGameDev mobile course',
  icon: 'autobattler-logo',
  iconContrast: 'autobattler-logo',
  fullScreen: true,
  size: {width: '720px', height: '1280px'},
  data: { url: 'assets/static/webgl/autobattler/index.html' },
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('applications'),
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const knightsAndMonsters = new Application({
  title: 'Knights VS Monsters',
  component: 'KnightsAndMonstersComponent',
  alt: 'Play Knights VS Monsters Now!',
  icon: 'unity',
  iconContrast: 'unity',
  size: {width: '1200px', height: '1000px'},
  fullScreen: true,
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath('applications'),
      fs.getPath('game'),
      fs.getPath('desktop')
    ]
  }
});

const randomNameGenerator = new Application({
  title: 'Random Name Generator',
  component: 'RandomNameGeneratorComponent',
  alt: 'Generate random fantasy name',
  icon: 'dog_tag',
  iconContrast: 'dog_tag',
  size: {width: '1200px', height: '1000px'},
  fullScreen: false,
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath('applications'),
      fs.getPath('utilities'),
      fs.getPath('desktop')
    ]
  }
});

export const APPLICATIONS: { [key: string]: Application } = {
  console,
  welcome,
  browser_spaceInvaders,
  browser_helloUnity,
  explorer,
  textEditor,
  knightsAndMonsters,
  randomNameGenerator,
  browser_polyGone
};


export const applicationMapping = {
  'WelcomeComponent': WelcomeComponent,
  'ConsoleComponent': ConsoleComponent,
  'BrowserComponent': BrowserComponent,
  'FileExplorerComponent': FileExplorerComponent,
  'TextEditorComponent': TextEditorComponent,
  'KnightsAndMonstersComponent': KnightsAndMonstersComponent,
  'RandomNameGeneratorComponent': RandomNameGeneratorComponent
};

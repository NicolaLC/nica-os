import {ConsoleComponent} from '@applications/console.component';
import {BrowserComponent} from '@applications/browser.component';
import {FileExplorerComponent} from '@applications/file-explorer/file-explorer.component';
import {Application, APPLICATION_CATEGORY} from '@interfaces/interfaces';
import {WelcomeComponent} from '@applications/welcome/welcome.component';
import {fs, FS_PATH_MAPPING} from '@constants/filesystem';
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
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.UTILITIES),
      fs.getPath(FS_PATH_MAPPING.DESKTOP)
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
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.UTILITIES)
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
  size: {width: '800px', height: '500px'},
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath(FS_PATH_MAPPING.UTILITIES),
      fs.getPath(FS_PATH_MAPPING.APPLICATION)
    ]
  }
});

const welcome = new Application({
  title: 'Welcome',
  component: 'WelcomeComponent',
  alt: 'Who is Nicola Castellani?',
  icon: 'home',
  iconContrast: 'home',
  fullScreen: false,
  size: {width: '1000px', height: '800px'},
  fs: {
    category: APPLICATION_CATEGORY.INFO,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.INFO),
      fs.getPath(FS_PATH_MAPPING.DESKTOP)
    ]
  }
});

const browser_spaceInvaders = new Application({
  title: 'PLAY Space Invaders',
  alt: 'Play now SpaceInvaders JS, a personal project created using typescript and three js!',
  component: 'BrowserComponent',
  icon: 'spaceinvaders',
  iconContrast: 'spaceinvaders',
  fullScreen: true,
  size: {width: '1200px', height: '1000px'},
  data: {url: 'https://nicolalc.github.io/jssheet/spaceinvaders/index.html'},
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES)
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
  data: {url: 'https://nicawd.herokuapp.com/unity-demo'},
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES)
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
  data: {url: 'assets/static/webgl/polygone/index.html'},
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES),
      fs.getPath(FS_PATH_MAPPING.DESKTOP)
    ]
  }
});

const browser_relativeGravity = new Application({
  title: 'Relative Gravity!',
  component: 'BrowserComponent',
  alt: 'Gravity based puzzle platformer in Unity!',
  icon: 'unity',
  iconContrast: 'unity',
  fullScreen: true,
  size: {width: '720px', height: '1280px'},
  data: {url: 'assets/static/webgl/relativegravity/index.html'},
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES),
      fs.getPath(FS_PATH_MAPPING.DESKTOP)
    ]
  }
});

const browser_autoBattler = new Application({
  title: 'AutoBattler!',
  component: 'BrowserComponent',
  alt: 'A full mobile game made for MasterGameDev mobile course',
  icon: 'autobattler_logo',
  iconContrast: 'autobattler_logo',
  fullScreen: true,
  size: {width: '720px', height: '1280px'},
  data: {url: 'assets/static/webgl/autobattler/index.html'},
  fs: {
    category: APPLICATION_CATEGORY.GAME,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES),
      fs.getPath(FS_PATH_MAPPING.DESKTOP)
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
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.GAMES)
    ]
  }
});

const randomNameGenerator = new Application({
  title: 'Random Name Generator',
  component: 'RandomNameGeneratorComponent',
  alt: 'Generate random fantasy name',
  icon: 'random',
  iconContrast: 'random',
  size: {width: '1200px', height: '1000px'},
  fullScreen: false,
  fs: {
    category: APPLICATION_CATEGORY.UTILITY,
    paths: [
      fs.getPath(FS_PATH_MAPPING.APPLICATION),
      fs.getPath(FS_PATH_MAPPING.UTILITIES)
    ]
  }
});

export const APPLICATIONS: { [key: string]: Application } = {
  console,
  welcome,
  browser_autoBattler,
  browser_relativeGravity,
  browser_polyGone,
  browser_spaceInvaders,
  browser_helloUnity,
  explorer,
  textEditor,
  knightsAndMonsters,
  randomNameGenerator
};


export const applicationMapping = {
  'WelcomeComponent': WelcomeComponent,
  'ConsoleComponent': ConsoleComponent,
  'BrowserComponent': BrowserComponent,
  'FileExplorerComponent': FileExplorerComponent,
  'TextEditorComponent': TextEditorComponent,
  'KnightsAndMonstersComponent': KnightsAndMonstersComponent,
  'RandomNameGeneratorComponent': RandomNameGeneratorComponent,
};

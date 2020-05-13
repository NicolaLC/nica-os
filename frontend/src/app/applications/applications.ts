import {Application} from '../interfaces';

const console = new Application({
  title: 'Console',
  component: 'ConsoleComponent',
  icon: 'console',
  iconContrast: 'consoleContrast',
  startPosition: {x: '100px', y: '100px'},
  size: {width: '500px', height: '300px'}
});
const welcome = new Application({
  title: 'Welcome!', component: 'WelcomeComponent', icon: 'home', iconContrast: 'homeContrast',
  startPosition: {x: '700px', y: '100px'}
});
export const APPLICATIONS: { [key: string]: Application } = {
  console,
  welcome
};

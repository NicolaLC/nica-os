import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import {faGamepad} from '@fortawesome/free-solid-svg-icons/faGamepad';
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons/faPencilRuler';
import {faMusic} from '@fortawesome/free-solid-svg-icons/faMusic';
import {faHeadset} from '@fortawesome/free-solid-svg-icons/faHeadset';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';

export class Skill {
  title: string;
  description: string;
  icon: IconDefinition;
}

export const DEVELOPMENT_SKILLS: Skill[] = [
  {
    title: 'C++',
    description: 'Using C++ for game development, using <b>Unreal</b> or custom code.',
    icon: faLaptopCode
  },
  {
    title: 'C#',
    description: 'Game development with <b>Unity</b>.',
    icon: faLaptopCode
  },
  {
    title: 'TypeScript',
    description: '<b>Angular</b> and <b>React</b> web applications.',
    icon: faLaptopCode
  }
];

export const FRAMEWORK_SKILLS: Skill[] = [
  {
    title: 'Unreal',
    description: 'Game development using both <b>C++</b> and <b>Blueprints</b>.',
    icon: faGamepad
  },
  {
    title: 'Unity',
    description: 'Game development using both <b>C#</b>.',
    icon: faGamepad
  },
  {
    title: 'Angular',
    description: 'Web applications and CMS.',
    icon: faPuzzlePiece
  },
  {
    title: 'React',
    description: 'Web applications, online games.',
    icon: faPuzzlePiece
  },
  {
    title: 'Three.JS',
    description: 'WebGL library.',
    icon: faPuzzlePiece
  },
  {
    title: 'Pixie.js',
    description: 'WebGL library.',
    icon: faPuzzlePiece
  },
  {
    title: 'GSAP',
    description: 'Web animations made easy.',
    icon: faPuzzlePiece
  },
  {
    title: 'Cypress',
    description: 'Web e2e tests.',
    icon: faPuzzlePiece
  }
];


export const TOOLS_SKILLS: Skill[] = [
  {
    title: 'Gravit Designer',
    description: 'Vector graphics, UI design.',
    icon: faPencilRuler
  },
  {
    title: 'Aseprite',
    description: 'Pixel art.',
    icon: faPencilRuler
  },
  {
    title: 'Mirò',
    description: 'Brain storming, UX design.',
    icon: faPencilRuler
  },
  {
    title: 'Toggl',
    description: 'Time tracking.',
    icon: faClock
  },
  {
    title: 'Fruity Loops',
    description: 'Music and SFX.',
    icon: faMusic
  },
  {
    title: 'Discord',
    description: 'Team communications.',
    icon: faHeadset
  },
  {
    title: 'Slack',
    description: 'Team communications.',
    icon: faHeadset
  },
  {
    title: 'Teams',
    description: 'Team communications.',
    icon: faHeadset
  },
  {
    title: 'IntelliJ',
    description: 'C# and C++ development IDE.',
    icon: faCode
  },
  {
    title: 'VS',
    description: 'C# and C++ development IDE.',
    icon: faCode
  },
  {
    title: 'VS Code',
    description: 'Web development.',
    icon: faCode
  }
];

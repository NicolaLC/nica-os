/** GLOBAL APP FILESYSTEM */
import {File, FILE_CATEGORY, FileSystem} from '@interfaces/interfaces';

export const FS_PATH_MAPPING = {
  ROOT: 'system',
  APPLICATION: 'applications',
  DESKTOP: 'desktop',
  UTILITIES: 'utilities',
  GAMES: 'games',
  OTHERS: 'others',
  INFO: 'info',
  SYSTEM: 'system',
  PROJECTS: 'projects',
  SOCIAL: 'social'
};

export const fs: FileSystem = new FileSystem(
  FS_PATH_MAPPING.ROOT,
  {
    system: FS_PATH_MAPPING.SYSTEM,
    info: FS_PATH_MAPPING.INFO,
    projects: FS_PATH_MAPPING.PROJECTS,
    social: FS_PATH_MAPPING.SOCIAL,
    games: FS_PATH_MAPPING.GAMES,
    applications: FS_PATH_MAPPING.APPLICATION,
    desktop: FS_PATH_MAPPING.DESKTOP,
    utilities: FS_PATH_MAPPING.UTILITIES,
    others: FS_PATH_MAPPING.OTHERS,
  }
);

export const FILES: File[] = [
  {
    properties: {
      name: 'AutoBattler! code',
      alt: 'Auto battler game made in Unity',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/mobile_endtermproject'},
      icon: 'unity',
      iconContrast: 'unity'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'PolyGone code',
      alt: 'A simple 3 match game in Unity',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/match-3-game'},
      icon: 'unity',
      iconContrast: 'unity'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Top down shooter in Unreal',
      alt: 'A simple TD shooter to start working with the engine',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/topdownshooter_unreal'},
      icon: 'unreal',
      iconContrast: 'unreal'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Collection of unity scripts (WIP)',
      alt: 'Some of the script I use raelly often',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/useful-unity-scripts'},
      icon: 'unity',
      iconContrast: 'unity'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Physics game in Unity',
      alt: 'Get crazy with this simple game used for physics programming course',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/physic-eotproject'},
      icon: 'unity',
      iconContrast: 'unity'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'FMOD Core API c++ middleware',
      alt: 'A custom loop machine using FMOD core API',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/soundprogramming-eot'},
      icon: 'gitlab',
      iconContrast: 'gitlab'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Excuse me, I\'ve lost my...',
      alt: 'Game made for GGJ 2021, using Godot',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/ggj2021-project'},
      icon: 'gitlab',
      iconContrast: 'gitlab'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Quaternions, Euler, AngleAxis, Matrix3 custom implementation',
      alt: 'Learning custom rotation management with c++ for Advanced Graphic course',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/agp-eotproject'},
      icon: 'gitlab',
      iconContrast: 'gitlab'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'C++ Memory manager and custom BigInteger',
      alt: 'My custom implementation o a memory manager and infinite integer',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://gitlab.com/nicolacastellanidev/advcpp'},
      icon: 'gitlab',
      iconContrast: 'gitlab'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Electron floating screen',
      alt: 'Gitkraken like loading screen with electron!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://github.com/NicolaLC/ElectronFloatingScreen'},
      icon: 'github',
      iconContrast: 'github'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Spaceinvaders TS',
      alt: 'Custom WebGL engine using Typescript',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://github.com/NicolaLC/spaceinvaders-js/tree/feature/ts'},
      icon: 'github',
      iconContrast: 'github'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'Marimar',
      alt: 'Take a look to marimar website!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'http://www.marimar.net'},
      icon: 'marimar',
      iconContrast: 'marimar'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: 'JSSheet',
      alt: 'Javascript Based Stylesheets!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://nicolalc.github.io/jssheet/'},
      icon: 'jssheetIcon',
      iconContrast: 'jssheetIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.PROJECTS)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },

  {
    properties: {
      name: 'Itch.io',
      alt: 'My personal profile on itch.io',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://amazingsuprise.itch.io/'},
      icon: 'itch',
      iconContrast: 'itch'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.SOCIAL),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)
      ],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'YouTube',
      alt: 'Videos about game prototypes',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://www.youtube.com/channel/UC7NzbI1ti8ePGzmOkX5byTA'},
      icon: 'youtube',
      iconContrast: 'youtube'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.SOCIAL),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'CodinGame',
      alt: 'My codin game profile',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://www.codingame.com/profile/a854de0c07f757bbde5aba79f11aecf21492014'},
      icon: 'codingame',
      iconContrast: 'codingame'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.SOCIAL),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'DEV.to',
      alt: 'Checkout my DEV.to profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://dev.to/nicolalc'},
      icon: 'devTo',
      iconContrast: 'devTo'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.SOCIAL)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'LinkedIn',
      alt: 'Checkout my Linkedin profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://www.linkedin.com/in/nicola-castellani-313b9084/'},
      icon: 'linkedin',
      iconContrast: 'linkedin'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.SOCIAL),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'Twitter',
      alt: 'Checkout my Twitter profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://twitter.com/amazingsurpr1se'},
      icon: 'twitterIcon',
      iconContrast: 'twitterIcon'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.SOCIAL),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'Reddit',
      alt: 'Checkout my Reddit profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://www.reddit.com/user/AmazingSurprise'},
      icon: 'redditIcon',
      iconContrast: 'redditIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.SOCIAL)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'HackerNoon',
      alt: 'Checkout my HackerNoon profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://hackernoon.com/u/nicolacastellanidev'},
      icon: 'hackernoonIcon',
      iconContrast: 'hackernoonIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.SOCIAL)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.APPLICATION,
      alt: 'Applications folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [
        fs.getPath(FS_PATH_MAPPING.ROOT),
        fs.getPath(FS_PATH_MAPPING.DESKTOP)
      ],
      root: fs.getPath(FS_PATH_MAPPING.APPLICATION)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.PROJECTS,
      alt: 'Projects folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.GAMES,
      alt: 'Games folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.GAMES)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.SOCIAL,
      alt: 'Socials folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  }
];

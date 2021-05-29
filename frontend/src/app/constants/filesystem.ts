/** GLOBAL APP FILESYSTEM */
import {File, FILE_CATEGORY, FileSystem} from '@interfaces/interfaces';

export const FS_PATH_MAPPING = {
  ROOT: 'system',
  APPLICATION: 'applications',
  DESKTOP: 'desktop',
  UTILITIES: 'utilities',
  GAME: 'games',
  OTHERS: 'others',
  INFO: 'info',
  SYSTEM: 'system',
  PROJECTS: 'projects',
  SOCIAL: 'social'
};

export const fs: FileSystem = new FileSystem(
  FS_PATH_MAPPING.ROOT,
  {
    applications: FS_PATH_MAPPING.APPLICATION,
    desktop: FS_PATH_MAPPING.DESKTOP,
    utilities: FS_PATH_MAPPING.UTILITIES,
    game: FS_PATH_MAPPING.GAME,
    others: FS_PATH_MAPPING.OTHERS,
    info: FS_PATH_MAPPING.INFO,
    system: FS_PATH_MAPPING.SYSTEM,
    projects: FS_PATH_MAPPING.PROJECTS,
    social: FS_PATH_MAPPING.SOCIAL
  }
);

export const FILES: File[] = [
  {
    properties: {
      name: FS_PATH_MAPPING.APPLICATION,
      alt: 'Applications folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIconApps',
      iconContrast: 'folderIconApps'
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
      icon: 'folderIconProjects',
      iconContrast: 'folderIconProjects'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.PROJECTS)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.GAME,
      alt: 'Games folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIconGame',
      iconContrast: 'folderIconGame'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.GAME)
    }
  },
  {
    properties: {
      name: FS_PATH_MAPPING.SOCIAL,
      alt: 'Socials folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'socialFolderIcon',
      iconContrast: 'socialFolderIcon'
    },
    fs: {
      paths: [fs.getPath(FS_PATH_MAPPING.ROOT), fs.getPath(FS_PATH_MAPPING.DESKTOP)],
      root: fs.getPath(FS_PATH_MAPPING.SOCIAL)
    }
  },
  {
    properties: {
      name: 'marimar',
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
      paths: [fs.getPath(FS_PATH_MAPPING.SOCIAL)],
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
      paths: [fs.getPath(FS_PATH_MAPPING.SOCIAL)],
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
  }
];

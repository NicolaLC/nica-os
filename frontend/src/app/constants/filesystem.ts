/** GLOBAL APP FILESYSTEM */
import {File, FILE_CATEGORY, FileSystem} from '../interfaces/interfaces';

export const fs: FileSystem = new FileSystem(
  'system',
  {
    applications: 'applications',
    desktop: 'desktop',
    utilities: 'utilities',
    game: 'game',
    others: 'others',
    info: 'info',
    system: 'system',
    projects: 'projects',
    social: 'social'
  }
);

export const FILES: File[] = [
  {
    properties: {
      name: 'applications',
      alt: 'Applications folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [
        fs.getPath('system'),
        fs.getPath('dekstop')
      ],
      root: fs.getPath('applications')
    }
  },
  {
    properties: {
      name: 'projects',
      alt: 'Projects folder',
      category: FILE_CATEGORY.FOLDER,
      icon: 'folderIcon',
      iconContrast: 'folderIcon'
    },
    fs: {
      paths: [fs.getPath('system'), fs.getPath('desktop')],
      root: fs.getPath('projects')
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
      paths: [fs.getPath('projects'), fs.getPath('desktop')],
      root: fs.getPath('projects')
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
      paths: [fs.getPath('social'), fs.getPath('desktop')],
      root: fs.getPath('social')
    }
  },
  {
    properties: {
      name: 'Linkedin',
      alt: 'Checkout my Linkedin profile!',
      category: FILE_CATEGORY.LINK,
      data: {url: 'https://www.linkedin.com/in/nicola-castellani-313b9084/'},
      icon: 'linkedin',
      iconContrast: 'linkedin'
    },
    fs: {
      paths: [fs.getPath('social'), fs.getPath('desktop')],
      root: fs.getPath('social')
    }
  }
];

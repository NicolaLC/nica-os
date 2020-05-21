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
    system: 'system'
  }
);

export const files: File[] = [
  {
    name: 'projects',
    fs: {
      category: FILE_CATEGORY.FOLDER,
      path: fs.root
    }
  },
  {
    name: 'marimar',
    fs: {
      category: FILE_CATEGORY.LINK,
      path: `${fs.root}/projects`
    }
  }
];

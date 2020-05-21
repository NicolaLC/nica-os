import * as uuid from 'uuid';

/** ASSETS MANAGEMENT */
export class AssetMap {
  [key: string]: Asset;
}

export class Asset {
  path: string;
  loaded: boolean;
  resource: any;
}

/** ./ ASSETS MANAGEMENT */
/** APPLICATION MANAGEMENT */
export class Application {

  readonly id: string;
  properties?: ApplicationProperties;

  constructor(properties: ApplicationProperties) {
    this.properties = {
      fullScreen: false,
      draggable: true,
      focus: true,
      minified: false,
      ...properties
    };
    this.id = uuid.v4();
  }
}

export enum APPLICATION_CATEGORY {
  GAME = 'GAME',
  UTILITY = 'UTILITY',
  INFO = 'INFO',
  OTHERS = 'OTHERS'
}

export class ApplicationProperties {
  title?: string;
  component?: any;
  fullScreen?: boolean;
  draggable?: boolean;
  focus?: boolean;
  minified?: boolean;
  icon?: string;
  iconContrast?: string;
  startPosition?: { x: string, y: string };
  size?: { width: string, height: string };
  data?: { [key: string]: any };
  fs?: {
    paths: string[];
    category: APPLICATION_CATEGORY;
  };
}

/** ./ APPLICATION MANAGEMENT */
/** APP SETTINGS MANAGEMENT */
export class AppSettings {
  theme: string;
}

/** ./ APP SETTINGS MANAGEMENT */

/** FILE MANAGEMENT */

export enum FILE_CATEGORY {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  APPLICATION = 'APPLICATION',
  FOLDER = 'FOLDER'
}

export class File {
  name?: string;
  fs?: {
    path: string;
    category: FILE_CATEGORY;
  };
}

export class FileSystem {
  get root(): string {
    return this._root;
  }

  set root(value: string) {
    this._root = value;
  }

  get paths(): { [p: string]: string } {
    return this._paths;
  }

  set paths(value: { [p: string]: string }) {
    this._paths = value;
  }

  private _root: string;
  private _paths: { [key: string]: string };

  constructor(root: string, paths: { [key: string]: string }) {
    this.paths = paths;
    this.root = root;
  }

  getPath(pathPartial: string) {
    const target = this._paths[pathPartial];
    return target ? `${this._root}/${target}` : null;
  }
}

/** ./ FILE MANAGEMENT */

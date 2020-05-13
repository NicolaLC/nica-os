import * as uuid from 'uuid';

export class AssetMap {
  [key: string]: Asset;
}
export class Asset {
  path: string;
  loaded: boolean;
  resource: any;
}

export class Application {

  readonly id: string;
  properties?: ApplicationProperties;

  constructor(properties: ApplicationProperties) {
    this.properties = {
      ...properties,
      fullScreen: false,
      draggable: true,
      focus: true,
      minified: false
    };
    this.id = uuid.v4();
  }
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
  startPosition?: {x: string, y: string};
  size?: {width: string, height: string};
}

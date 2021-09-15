import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {File, FILE_CATEGORY} from '@interfaces/interfaces';
import {setCurrentPath} from '@fsstore/file-explorer.actions';
import {createApp} from '@appstore/app.actions';
import {APPLICATIONS} from '@constants/applications';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class UtilityService {

  isMobile: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private store$: Store<any>) {
    window.addEventListener('resize', () => this.onWindowResize());
    this.onWindowResize();
  }

  onWindowResize() {
    this.isMobile.next(document.body.offsetWidth <= 768);
  }

  openFile(file: File) {
    switch ( file.properties.category ) {
      case FILE_CATEGORY.FOLDER:
        this.store$.dispatch(setCurrentPath({path: file.fs.root}));
        return this.store$.dispatch(createApp({app: APPLICATIONS.explorer}));
      case FILE_CATEGORY.LINK:
        return window.open(file.properties.data.url, '_blank');
      // this.store$.dispatch(setCurrentPath({path: file.fs.root}));
      // return this.store$.dispatch(createApp({app: APPLICATIONS.browser, data: {url: file.properties.data.url}}));
      default:
        return console.warn('No category found for file %o', file);
    }
  }
}

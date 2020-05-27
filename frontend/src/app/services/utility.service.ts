import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {File, FILE_CATEGORY} from '@interfaces/interfaces';
import {setCurrentPath} from '@fsstore/file-explorer.actions';
import {createApp} from '@appstore/app.actions';
import {APPLICATIONS} from '@constants/applications';

@Injectable()
export class UtilityService {
  constructor(private store$: Store<any>) {}
  openFile(file: File) {
    switch (file.properties.category) {
      case FILE_CATEGORY.FOLDER:
        this.store$.dispatch(setCurrentPath({path: file.fs.root}));
        return this.store$.dispatch(createApp({app: APPLICATIONS.explorer}));
      case FILE_CATEGORY.LINK:
        return window.open(file.properties.data.url, '_blank');
      default:
        return console.warn('No category found for file %o', file);
    }
  }
}

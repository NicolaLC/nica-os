import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {FileExplorerState} from './file-explorer.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class FileExplorerEffects {

  constructor(
    private store$: Store<FileExplorerState>,
    private actions$: Actions
  ) {}
}

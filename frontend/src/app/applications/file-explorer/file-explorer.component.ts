import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '@appstore/app.reducer';
import {fs} from '@constants/filesystem';
import {selectApplicationsByCurrentPath, selectCurrentPath} from './store/file-explorer.reducer';
import {resetFileExplorer, setCurrentPath} from './store/file-explorer.actions';
import {createApp, setAppFocus} from '@appstore/app.actions';
import {Application} from '@interfaces/interfaces';

@Component({
  selector: 'app-file-explorer',
  template: `
    <div class="app-file-explorer">
      <div class="app-file-explorer-toolbar">
        <input id="current-path" [value]="(currentPath$ | async) + '/'" disabled/>
      </div>
      <div class="app-file-explorer-three">
        <ul>
          <li *ngFor="let path of paths" (click)="setPath(path)">
            <div class="icon"
                 [innerHTML]="(loadedAssets$ | async).folderIcon.resource | safe:'html'"
            ></div>
            {{path}}
          </li>
        </ul>
      </div>
      <div class="app-file-explorer-result">
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let app of (result$ | async); trackBy: trackByFn" (click)="openApp(app)">
            <td>
              <div class="icon"
                   *ngIf="app?.properties?.icon"
                   [innerHTML]="(loadedAssets$ | async)[app?.properties?.iconContrast]?.resource | safe:'html'"
              ></div>
              <p>{{app.properties.title}}</p>
            </td>
            <td>
              {{app.properties.fs.category}}
            </td>
          </tr>
          <tr class="app-file-explorer-result-empty" *ngIf="(result$ | async).length === 0">
            <td colspan="2"><h3>No results.</h3></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileExplorerComponent implements OnDestroy {
  public data: any;
  public window: Application;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  currentPath$ = this.store$.pipe(select(selectCurrentPath));
  result$ = this.store$.pipe(select(selectApplicationsByCurrentPath));
  paths = Object.values(fs.paths);

  constructor(private store$: Store<any>) {
  }

  setPath(path: string) {
    this.store$.dispatch(setCurrentPath({path}));
  }

  openApp(app) {
    this.store$.dispatch(setAppFocus({app: this.window, focus: false}));
    this.store$.dispatch(createApp({app}));
  }

  ngOnDestroy() {
    this.store$.dispatch(resetFileExplorer());
  }

  trackByFn(index, item) {
    return index;
  }
}

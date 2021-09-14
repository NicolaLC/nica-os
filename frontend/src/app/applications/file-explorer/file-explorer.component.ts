import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '@appstore/app.reducer';
import {fs} from '@constants/filesystem';
import {
  selectApplicationsByCurrentPath, selectCurrentPath, selectFilesByCurrentPath
} from './store/file-explorer.reducer';
import {resetFileExplorer, setCurrentPath} from './store/file-explorer.actions';
import {createApp, openFile} from '@appstore/app.actions';
import {Application, File} from '@interfaces/interfaces';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-file-explorer', template: `
    <div class="app-file-explorer">
      <div class="app-file-explorer-toolbar">
        <fa-icon [icon]="faSearch"></fa-icon>
        <input id="current-path"
               [value]="(currentPath$ | async) + '/'"
               disabled/>
      </div>
      <div class="app-file-explorer-three">
        <ul>
          <li *ngFor="let path of paths"
              (click)="setPath(path)"
              [class.active]="(currentPath$ | async) === fs.getPath(path)"
              [class.secondary]="path !== fs.root">
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
          <ng-container *ngIf="(resultApplications$ | async).length > 0">
            <tr class="app-file-explorer-result-separator">
              <td [colSpan]="2">
                <h4>Applications</h4>
              </td>
            </tr>
            <tr
              *ngFor="let app of (resultApplications$ | async); trackBy: trackByFn"
              [title]="app.properties?.alt || ''"
              (click)="openApp(app, $event)">
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
          </ng-container>
          <ng-container *ngIf="(resultFiles$ | async).length > 0">
            <tr class="app-file-explorer-result-separator">
              <td [colSpan]="2">
                <h4>File</h4>
              </td>
            </tr>
            <tr
              *ngFor="let file of (resultFiles$ | async); trackBy: trackByFn"
              [title]="file.properties?.alt || ''"
              (click)="openFile(file, $event)">
              <td>
                <div class="icon"
                     *ngIf="file?.properties?.icon"
                     [innerHTML]="(loadedAssets$ | async)[file?.properties?.iconContrast]?.resource | safe:'html'"
                ></div>
                <p>{{file.properties.name}}</p>
              </td>
              <td>
                {{file.properties.category}}
              </td>
            </tr>
          </ng-container>
          <ng-container *ngIf="(resultApplications$ | async).length == 0 && (resultFiles$ | async).length == 0">
            <tr>
              <td colspan="2"><h3>No results.</h3></td>
            </tr>
          </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileExplorerComponent implements OnDestroy {
  public data: any;
  public window: Application;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  currentPath$ = this.store$.pipe(select(selectCurrentPath));
  resultApplications$ = this.store$.pipe(select(selectApplicationsByCurrentPath));
  resultFiles$ = this.store$.pipe(select(selectFilesByCurrentPath));
  paths = Object.values(fs.paths);
  fs = fs;

  faSearch = faSearch;

  constructor(private store$: Store<any>) {
  }

  setPath(path: string) {
    this.store$.dispatch(setCurrentPath({path}));
  }

  openApp(app, event) {
    event.preventDefault();
    event.stopPropagation();
    this.store$.dispatch(createApp({app}));
  }

  openFile(file: File, event) {
    event.preventDefault();
    event.stopPropagation();
    this.store$.dispatch(openFile({file}));
  }

  ngOnDestroy() {
    this.store$.dispatch(resetFileExplorer());
  }

  trackByFn(index, item) {
    return index;
  }
}

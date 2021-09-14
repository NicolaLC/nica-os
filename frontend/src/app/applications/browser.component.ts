import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '../store/app.reducer';

@Component({
  selector: 'app-browser',
  template: `
    <div class="app-browser">
      <div class="app-browser-searchbar">
        <input disabled
               [value]="data?.url"
               placeholder="url"/>
      </div>
      <iframe [src]="data?.url | safe: 'resourceUrl'"></iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrowserComponent {
  public data: any;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));

  constructor(private store$: Store<any>) {}
}

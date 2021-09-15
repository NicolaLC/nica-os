import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '../store/app.reducer';
import {faRedo} from '@fortawesome/free-solid-svg-icons/faRedo';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';

@Component({
  selector: 'app-browser',
  template: `
    <div class="app-browser">
      <div class="app-browser-searchbar">
        <input disabled
               [value]="data?.url"
               placeholder="url"/>
      </div>
      <iframe [src]="data?.url | safe: 'resourceUrl'"
              #iframe></iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrowserComponent {
  public data: any;
  faReload = faRedo;
  faBack = faLongArrowAltLeft;

  @ViewChild('iframe')
  _iFrameRef: ElementRef;

  constructor(private store$: Store<any>) {}

  private get frame(): HTMLFrameElement {
    return this._iFrameRef.nativeElement as HTMLFrameElement;
  }
}

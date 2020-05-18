import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectConsoleMessages, selectLoadingMessage} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {environment} from 'src/environments/environment';
import {skip} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-console',
  template: `
    <div id="console">
      <ul>
        <li>
          <div class="console-rindex">[0]</div>
          <div class="console-message">Loading...</div>
        </li>
        <li *ngFor="let message of (consoleMessages$ | async); let i = index; trackBy: trackByFn">
          <div class="console-rindex">[{{ i + 1 }}]</div>
          <div class="console-message" [innerHTML]="message | safe:'html'"></div>
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConsoleComponent {
  public data: any;
  consoleMessages$ = this.store$.pipe(select(selectConsoleMessages));
  constructor(private store$: Store<AppState>) {}

  trackByFn(index, item) {
    return index;
  }
}

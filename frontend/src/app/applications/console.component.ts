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
      <table>
        <tbody>
        <tr>
          <td class="console-rindex">[0]</td>
          <td class="console-message">Loading...</td>
        </tr>
        <tr *ngFor="let message of (consoleMessages$ | async); let i = index; trackBy: trackByFn">
          <td class="console-rindex">[{{ i + 1 }}]</td>
          <td class="console-description"
              [innerHTML]="message.description | safe:'html'"></td>
          <td class="console-message"
              colspan="3"
              [innerHTML]="message.message | safe:'html'"></td>
        </tr>
        </tbody>
      </table>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConsoleComponent {
  public data: any;
  consoleMessages$ = this.store$.pipe(select(selectConsoleMessages));

  constructor(private store$: Store<AppState>) {}

  trackByFn(index, item) {
    return index;
  }
}

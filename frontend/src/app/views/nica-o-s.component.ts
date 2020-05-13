import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AppState, selectLoading} from '../store/app.reducer';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-homepage',
  template: `
    <app-loader-component *ngIf="loading$ | async"></app-loader-component>
    <ng-container *ngIf="(loading$ | async) === false">
      <div class="nicaos" id="homepage">
        <!--app-hero-header-component></app-hero-header-component>
        <app-services-component></app-services-component>
        <app-works-component></app-works-component>
        <app-blog-component></app-blog-component>
        <app-footer-component></app-footer-component-->
        <app-desktop></app-desktop>
        <app-taskbar></app-taskbar>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NicaOSComponent {
  loading$ = this.store$.pipe(select(selectLoading));
  constructor(
    public store$: Store<AppState>
  ) {}
}

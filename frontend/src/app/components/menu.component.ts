import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets, selectApplications} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {createApp, setAppFocus, setAppMinified, toggleMenuActive} from '../store/app.actions';
import {Application} from '../interfaces';
import {APPLICATIONS} from '../applications/applications';

@Component({
  selector: 'app-menu',
  template: `
    <div class="menu" #menu>
      <div class="menu-applications">
        <h3>Applications</h3>
        <div
          class="menu-applications-item"
          *ngFor="let app of applications; trackBy: trackByFn"
          (click)="create(app)"
        >
          <div class="icon"
               *ngIf="app?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[app?.properties?.iconContrast]?.resource | safe:'html'"
          ></div>
          {{app.properties.title}}
        </div>
      </div>
      <div class="menu-user">
        <div class="menu-user-icon"
             [style.background]="'url(assets/' + (loadedAssets$ | async)?.nicaCutted?.path + ')'"></div>
        <div class="menu-user-info">
          <h4>Nicola Castellani</h4>
          <b>ADMINISTRATOR</b>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements AfterViewInit {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  applications = Object.values(APPLICATIONS);
  menuAnimation: TimelineMax;

  @ViewChild('menu')
  _menu: ElementRef;
  private get menu(): HTMLElement { return this._menu.nativeElement; }

  constructor(
    public store$: Store<AppState>
  ) {}

  ngAfterViewInit() {
    this.animateIn();
  }

  animateIn() {
    window.requestAnimationFrame(() => {
      this.menuAnimation = new TimelineMax({paused: true, reversed: false});
      this.menuAnimation.to(this.menu, 1, {y: '0', ease: 'Expo.easeInOut', delay: 2}, 0);
      this.menuAnimation.play();
    });
  }

  toggleMenu() {
    this.store$.dispatch(toggleMenuActive());
  }

  create(app: Application) {
    this.store$.dispatch(createApp({app}));
    this.toggleMenu();
  }

  trackByFn(index, item) {
    return index;
  }
}

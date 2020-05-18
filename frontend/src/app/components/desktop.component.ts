import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets, selectApplications} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {createApp, setAppMinified, setConsoleMessage, toggleMenuActive, closeMenu} from '../store/app.actions';
import {Application} from '../interfaces';
import {WelcomeComponent} from '../applications/welcome.component';
import {APPLICATIONS} from '../applications/applications';

@Component({
  selector: 'app-desktop',
  template: `
    <div class="desktop" #desktop>
      <div class="icon desktop-background"
           [style.background]="'url(assets/' + (loadedAssets$ | async)?.nicaCutted?.path + ')'" #background>
      </div>
      <ng-container *ngIf="showIcons">
        <div class="desktop-icon"
             appDesktopItem
             *ngFor="let app of applications; trackBy: trackByFn"
             (click)="create(app)">
          <div class="icon"
               *ngIf="app?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[app?.properties?.iconContrast]?.resource | safe:'html'"
          ></div>
          {{app.properties.title}}
        </div>
      </ng-container>
      <app-window
        *ngFor="let window of (windows$ | async); trackBy: trackByFn"
        [currentWindow]="window"
      ></app-window>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DesktopComponent implements AfterViewInit {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  windows$ = this.store$.pipe(select(selectApplications));
  desktopAnimation: TimelineMax;

  showIcons = false;

  applications = Object.values(APPLICATIONS);

  @ViewChild('desktop')
  _desktop: ElementRef;
  private get desktop(): HTMLElement {
    return this._desktop.nativeElement;
  }

  @ViewChild('background')
  _background: ElementRef;
  private get background(): HTMLElement {
    return this._background.nativeElement;
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.store$.dispatch(closeMenu());
  }

  constructor(public store$: Store<AppState>) {
  }


  ngAfterViewInit() {
    this.animateIn();
  }

  animateIn() {
    window.requestAnimationFrame(() => {
      this.desktopAnimation = new TimelineMax({paused: true, reversed: false});
      this.desktopAnimation.to(this.desktop, 1, {opacity: '1', ease: 'Expo.easeInOut'}, 0);
      this.desktopAnimation.to(this.background, 1, {opacity: '.5', ease: 'Expo.easeInOut'}, 1);
      this.desktopAnimation.to(this.background, 1, {scale: '4', ease: 'Expo.easeInOut'}, 2);
      this.desktopAnimation.play();

      setTimeout(() => {
        this.showIcons = true;
        this.store$.dispatch(createApp({
          app: APPLICATIONS.console
        }));
        setTimeout(() => {
          this.store$.dispatch(setConsoleMessage({message: `<b>WELCOME USER</b>`}));
          this.store$.dispatch(setConsoleMessage({message: `<b>LOADING DESKTOP...</b>`}));
        }, 1000);
      }, 3000);

      setTimeout(() => {
        this.store$.dispatch(setAppMinified({ app: APPLICATIONS.console, minified: true }));
        this.store$.dispatch(createApp({ app: APPLICATIONS.welcome }));
      }, 6000);
    });
  }

  create(app: Application) {
    this.store$.dispatch(createApp({app}));
  }

  trackByFn(index, item) {
    return item.id;
  }
}

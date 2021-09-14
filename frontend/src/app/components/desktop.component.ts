import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectActiveApplications, selectLoadedAssets} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {closeMenu, createApp, openFile, setAppMinified, setConsoleMessage} from '../store/app.actions';
import {APPLICATIONS} from '@constants/applications';
import {Application, ConsoleMessage, File} from '@interfaces/interfaces';
import {fs} from '@constants/filesystem';
import {selectApplications, selectFiles} from '@fsstore/file-explorer.reducer';

@Component({
  selector: 'app-desktop',
  template: `
    <div class="desktop"
         #desktop>
      <div class="icon desktop-background"
           [style.background]="icons[currentIcon]"
           #background>
      </div>
      <ng-container *ngIf="showIcons">
        <div class="desktop-icon"
             appDesktopItem
             *ngFor="let app of (applications$ | async); trackBy: trackByFn"
             [title]="app.properties?.alt || ''"
             (click)="create(app)">
          <div class="icon"
               *ngIf="app?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[app?.properties?.iconContrast]?.resource | safe:'html'"
          ></div>
          {{app.properties.title}}
        </div>
        <div class="desktop-icon"
             appDesktopItem
             *ngFor="let file of (files$ | async); trackBy: trackByFn"
             [title]="file.properties?.alt || ''"
             (click)="openFile(file, $event)">
          <div class="icon"
               *ngIf="file?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[file?.properties?.iconContrast]?.resource | safe:'html'"
          ></div>
          {{file.properties?.name}}
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
  windows$ = this.store$.pipe(select(selectActiveApplications));
  desktopAnimation: TimelineMax;
  showIcons = false;
  applications$ = this.store$.pipe(select(selectApplications, {path: fs.getPath('desktop')}));
  files$ = this.store$.pipe(select(selectFiles, {path: fs.getPath('desktop')}));

  currentIcon = 0;
  icons = [
    'url(assets/science-icon.svg)',
    'url(assets/beer-icon.svg)',
    'url(assets/cat-icon.svg)',
    'url(assets/mountain-icon.svg)'
  ];
  randomizedCount = 1;
  randomizedTimeout = null;

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

  @HostListener('mousedown', ['$event'])
  onMouseDown({target}) {
    if ( target === this.desktop ) {
      this.store$.dispatch(closeMenu());
    }
  }

  constructor(
    public store$: Store<AppState>,
    private cd: ChangeDetectorRef
  ) {}


  ngAfterViewInit() {
    this.animateIn();
  }

  animateIn() {
    this.randomizedTimeout = setTimeout(() => this.randomizeLoader(), 100 * this.randomizedCount);
    setTimeout(() => {
      clearTimeout(this.randomizedTimeout);
    }, 2400);
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
          this.store$.dispatch(setConsoleMessage({message: new ConsoleMessage('[DESKTOP]', `<b>WELCOME USER</b>`)}));
          this.store$.dispatch(setConsoleMessage({message: new ConsoleMessage('[DESKTOP]', `<b>LOADING...</b>`)}));
        }, 1000);

        setTimeout(() => {
          this.store$.dispatch(setAppMinified({app: APPLICATIONS.console, minified: true}));
          this.store$.dispatch(createApp({app: APPLICATIONS.welcome}));
        }, 2000);
      }, 4000);
    });
  }

  create(app: Application) {
    this.store$.dispatch(createApp({app}));
  }

  openFile(file: File, event) {
    event.preventDefault();
    event.stopPropagation();
    this.store$.dispatch(openFile({file}));
  }

  trackByFn(index, item) {
    return item.id;
  }

  private randomizeLoader() {
    this.currentIcon = this.getRandomInt(0, this.icons.length - 1);
    this.cd.detectChanges();
    clearTimeout(this.randomizedTimeout);
    this.randomizedTimeout = setTimeout(() => this.randomizeLoader(), 10 * (++this.randomizedCount));
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

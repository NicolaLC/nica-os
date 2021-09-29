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
import {
  AppState,
  selectActiveApplications,
  selectLoadedAssets,
  selectMenuActive,
  selectTaskbarThemeSelectorActive,
  selectTheme
} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {
  setAppFocus,
  setAppMinified,
  setTheme,
  toggleMenuActive,
  toggleTaskbarThemeSelector
} from '../store/app.actions';
import {Application} from '../interfaces/interfaces';

@Component({
  selector: 'app-taskbar',
  template: `
    <div class="taskbar"
         #taskbar>
      <div class="taskbar-menu"
           (click)="toggleMenu()">
        <div class="icon"
             [innerHTML]="(loadedAssets$ | async)?.nicaLogo?.resource | safe:'html'"></div>
        <span>Menu</span>
      </div>
      <app-menu *ngIf="menuActive$ | async"></app-menu>
      <div class="taskbar-windows">
        <div class="taskbar-windows-item"
             appTaskbarItem
             *ngFor="let window of (windows$ | async); trackBy: trackByFn"
             [class.active]="!window.properties.minified"
             (click)="toggleWindowMinified(window)"
        >
          <div class="icon"
               *ngIf="window?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[window?.properties?.icon]?.resource | safe:'html'"
          ></div>
          <span>{{window.properties.title}}</span>
        </div>
      </div>
      <div class="taskbar-theme-toggle"
           title="Theme settings"
           (click)="toggleTaskbarThemeSelector()"></div>
      <div class="taskbar-theme"
           *ngIf="(selectTaskbarThemeSelectorActive$ | async)">
        <div class="taskbar-theme-colors">
          <h3>Choose a Theme color</h3>
          <div class="taskbar-theme-colors-picker">
            <div class="taskbar-theme-colors-item"
                 style="background-color: #21e6c1;"
                 [class.selected]="(selectedTheme$ | async) === 'default'"
                 (click)="setTheme('default')"></div>
            <div class="taskbar-theme-colors-item"
                 style="background-color: #ffc2e2;"
                 (click)="setTheme('pink')"
                 [class.selected]="(selectedTheme$ | async) === 'pink'"></div>
            <div class="taskbar-theme-colors-item"
                 style="background-color: #e56b6f;"
                 (click)="setTheme('sunset')"
                 [class.selected]="(selectedTheme$ | async) === 'sunset'"></div>
            <div class="taskbar-theme-colors-item"
                 style="background-color: #57f9ff;"
                 (click)="setTheme('elegant')"
                 [class.selected]="(selectedTheme$ | async) === 'elegant'"></div>
            <div class="taskbar-theme-colors-item"
                 style="background-color: #ffe8d6;"
                 (click)="setTheme('vintage')"
                 [class.selected]="(selectedTheme$ | async) === 'vintage'"></div>
            <div class="taskbar-theme-colors-item"
                 style="background-color: #000;"
                 (click)="setTheme('paper')"
                 [class.selected]="(selectedTheme$ | async) === 'paper'"></div>
          </div>
        </div>
      </div>
      <div class="taskbar-today"> {{date | date:'short'}} </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskBarComponent implements AfterViewInit, OnDestroy {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  windows$ = this.store$.pipe(select(selectActiveApplications));
  menuActive$ = this.store$.pipe(select(selectMenuActive));
  selectedTheme$ = this.store$.pipe(select(selectTheme));
  selectTaskbarThemeSelectorActive$ = this.store$.pipe(select(selectTaskbarThemeSelectorActive));
  taskbarAnimation: TimelineMax;

  date = new Date();
  dateInterval;

  @ViewChild('taskbar')
  _taskbar: ElementRef;
  private get taskbar(): HTMLElement {
    return this._taskbar.nativeElement;
  }

  constructor(
    public store$: Store<AppState>,
    private cd: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.animateIn();
    this.dateInterval = setInterval(() => {
      this.date = new Date();
      this.cd.detectChanges();
    }, 1000 / 60);
  }

  ngOnDestroy() {
    clearInterval(this.dateInterval);
  }

  animateIn() {
    window.requestAnimationFrame(() => {
      this.taskbarAnimation = new TimelineMax({paused: true, reversed: false});
      this.taskbarAnimation.to(this.taskbar, 1, {y: '0', ease: 'Expo.easeInOut', delay: 2}, 0);
      this.taskbarAnimation.play();
    });
  }

  toggleWindowMinified(w: Application) {
    this.store$.dispatch(setAppFocus({app: w, focus: true}));
    this.store$.dispatch(setAppMinified({app: w, minified: false}));
  }

  toggleMenu() {
    this.store$.dispatch(toggleMenuActive());
  }

  setTheme(themeName: string) {
    this.store$.dispatch(setTheme({theme: themeName}));
  }

  toggleTaskbarThemeSelector() {
    this.store$.dispatch(toggleTaskbarThemeSelector());
  }

  trackByFn(index, item) {
    return index;
  }
}

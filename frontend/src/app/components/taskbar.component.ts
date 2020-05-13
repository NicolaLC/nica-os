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
import {AppState, selectLoadedAssets, selectMenuActive, selectApplications} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {setAppFocus, setAppMinified, toggleMenuActive} from '../store/app.actions';
import {Application} from '../interfaces';

@Component({
  selector: 'app-taskbar',
  template: `
    <div class="taskbar" #taskbar>
      <div class="taskbar-menu" (click)="toggleMenu()">
        <div class="icon" [innerHTML]="(loadedAssets$ | async)?.nicaLogo?.resource | safe:'html'"></div> START
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
          {{window.properties.title}}
        </div>
      </div>
      <div class="taskbar-today"> {{date | date:'short'}} </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskBarComponent implements AfterViewInit, OnDestroy {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  windows$ = this.store$.pipe(select(selectApplications));
  menuActive$ = this.store$.pipe(select(selectMenuActive));
  taskbarAnimation: TimelineMax;

  date = new Date();
  dateInterval;

  @ViewChild('taskbar')
  _taskbar: ElementRef;
  private get taskbar(): HTMLElement { return this._taskbar.nativeElement; }

  constructor(
    public store$: Store<AppState>,
    private cd: ChangeDetectorRef
  ) {}

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
    this.store$.dispatch(setAppFocus( {app: w, focus: true}));
    this.store$.dispatch(setAppMinified({ app: w, minified: false }));
  }

  toggleMenu() {
    this.store$.dispatch(toggleMenuActive());
  }

  trackByFn(index, item) {
    return index;
  }
}

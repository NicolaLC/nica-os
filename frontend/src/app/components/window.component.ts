import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import Draggable from 'gsap/Draggable';
import {Application} from '../interfaces';
import {closeApp, setAppFocus, setAppFullscreen, setAppMinified} from '../store/app.actions';
import {WelcomeComponent} from '../applications/welcome.component';
import {ConsoleComponent} from '../applications/console.component';

@Component({
  selector: 'app-window',
  template: `
    <div
      class="window" #window
      [class.full-screen]="currentWindow.properties.fullScreen"
      [class.on-focus]="currentWindow.properties.focus"
      [class.hidden]="currentWindow.properties.minified"
      [style.left]="currentWindow.properties?.startPosition?.x"
      [style.top]="currentWindow.properties?.startPosition?.y"
      [style.width]="currentWindow.properties?.size?.width || 'auto'"
      [style.height]="currentWindow.properties?.size?.height || 'auto'"
      (click)="!currentWindow.properties.focus && toggleWindowFocus()"
    >
      <div class="window-toolbar">
        <div class="window-toolbar-title">
          <div class="icon"
                *ngIf="currentWindow?.properties?.icon"
               [innerHTML]="(loadedAssets$ | async)[currentWindow?.properties?.icon]?.resource | safe:'html'"
          ></div>
          {{currentWindow?.properties?.title}}
        </div>
        <div class="window-toolbar-actions">
          <div class="icon"
               *ngIf="!currentWindow.properties.fullScreen"
               [innerHTML]="(loadedAssets$ | async)?.fullscreen?.resource | safe:'html'"
               (click)="toggleFullScreen()"></div>
          <div class="icon"
               *ngIf="currentWindow.properties.fullScreen"
               [innerHTML]="(loadedAssets$ | async)?.closeFullscreen?.resource | safe:'html'"
               (click)="toggleFullScreen()"
          ></div>
          <div class="icon"
               [innerHTML]="(loadedAssets$ | async)?.minify?.resource | safe:'html'"
               (click)="toggleWindowMinified()"
          ></div>
          <div class="icon" [innerHTML]="(loadedAssets$ | async)?.closeWhite?.resource | safe:'html'" (click)="closeWindow()"></div>
        </div>
      </div>
      <div class="window-content">
        <ng-template #contentComponent></ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WindowComponent implements AfterViewInit {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  windowAnimation: TimelineMax;

  componentMapping = {
    'WelcomeComponent': WelcomeComponent,
    'ConsoleComponent': ConsoleComponent
  };

  @Input() currentWindow: Application;

  @ViewChild('window')
  _windowEl: ElementRef;

  @ViewChild('contentComponent', {read: ViewContainerRef, static: false})
  _windowContent: ViewContainerRef;

  private get windowEl(): HTMLElement {
    return this._windowEl.nativeElement;
  }

  constructor(
    private store$: Store<AppState>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(this.componentMapping[this.currentWindow.properties.component]);
    this._windowContent.clear();
    this._windowContent.createComponent(componentFactory);
    this.animateIn();
  }

  private animateIn() {
    if (this.windowAnimation && this.windowAnimation.progress() === 1) { return; }
    window.requestAnimationFrame(() => {
      this.windowAnimation = new TimelineMax({paused: true, reversed: false});
      this.windowAnimation.to(this.windowEl, 1, {opacity: '1', ease: 'Expo.easeInOut'}, 0);
      this.windowAnimation.to(this.windowEl, 1, {y: 0, ease: 'Expo.easeInOut'}, 0);
      this.windowAnimation.play();

      if (this.currentWindow.properties.draggable) {
        Draggable.create(this.windowEl,
          {type: 'x,y',
            edgeResistance: 0.65,
            bounds: '.desktop',
            inertia: true,
            onClick: () => this.store$.dispatch(setAppFocus({ app: this.currentWindow, focus: true})),
            onDragStart: () => this.store$.dispatch(setAppFocus({ app: this.currentWindow, focus: true})),
          });
      }
    });
  }

  closeWindow() {
    this.store$.dispatch(closeApp({app: this.currentWindow}));
  }

  toggleFullScreen() {
    this.store$.dispatch(setAppFullscreen({ app: this.currentWindow, fullScreen: !this.currentWindow.properties.fullScreen }));
  }

  toggleWindowFocus() {
    this.store$.dispatch(setAppFocus({ app: this.currentWindow, focus: !this.currentWindow.properties.focus }));
  }

  toggleWindowMinified() {
    this.store$.dispatch(setAppMinified({ app: this.currentWindow, minified: !this.currentWindow.properties.minified }))
  }
}

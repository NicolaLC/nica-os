import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input, OnChanges, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import Draggable from 'gsap/Draggable';
import {Application} from '../interfaces/interfaces';
import {closeApp, setAppFocus, setAppFullscreen, setAppMinified} from '../store/app.actions';
import {WelcomeComponent} from '../applications/welcome.component';
import {ConsoleComponent} from '../applications/console.component';
import { applicationMapping } from '../constants/applications';

@Component({
  selector: 'app-window',
  template: `
    <div
      class="window" #window
      [class.full-screen]="currentWindow.properties.fullScreen"
      [class.on-focus]="currentWindow.properties.focus"
      [class.hidden]="currentWindow.properties.minified"
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

export class WindowComponent implements AfterViewInit, OnChanges {
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  windowAnimation: TimelineMax;
  draggableRef: Draggable;

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
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(applicationMapping[this.currentWindow.properties.component]);
    this._windowContent.clear();
    const component = this._windowContent.createComponent(componentFactory);
    (component.instance as any).data = this.currentWindow.properties.data;
    (component.instance as any).window = this.currentWindow;
    this.animateIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    const {currentWindow} = changes;
    if (
      currentWindow &&
      currentWindow.previousValue &&
      currentWindow.currentValue.properties.fullScreen !== currentWindow.previousValue.properties.fullScreen
    ) {
      this.handleChanges(currentWindow.currentValue.properties.fullScreen);
    }
  }

  private handleChanges(fullScreen: boolean) {
    if (this.draggableRef) {
      fullScreen ? this.draggableRef.disable() : this.draggableRef.enable();
    }
  }

  private animateIn() {
    if (this.windowAnimation && this.windowAnimation.progress() === 1) { return; }
    window.requestAnimationFrame(() => {
      this.windowAnimation = new TimelineMax({paused: true, reversed: false});
      this.windowAnimation.to(this.windowEl, .25, {opacity: '1', ease: 'Expo.easeInOut'}, 0);
      this.windowAnimation.play();

      if (this.currentWindow.properties.draggable) {
        this.draggableRef = Draggable.create(this.windowEl,
          {
            type: 'x,y',
            edgeResistance: 0.65,
            trigger: this.windowEl.querySelector('.window-toolbar'),
            bounds: '.desktop',
            inertia: true,
            onClick: () => this.store$.dispatch(setAppFocus({ app: this.currentWindow, focus: true})),
            onDragStart: () => this.store$.dispatch(setAppFocus({ app: this.currentWindow, focus: true})),
            onRelease: (e) => this.draggableRef.endDrag(e)
          })[0];

        this.handleChanges(this.currentWindow.properties.fullScreen);
      }

      setTimeout(() => {
        this.cd.detectChanges();
      }, 0);
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
    this.store$.dispatch(setAppMinified({ app: this.currentWindow, minified: !this.currentWindow.properties.minified }));
  }
}

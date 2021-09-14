import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import Draggable from 'gsap/Draggable';
import {Application} from '@interfaces/interfaces';
import {closeApp, setAppFocus, setAppFullscreen, setAppMinified} from '../store/app.actions';
import {applicationMapping} from '@constants/applications';
import {UtilityService} from '@services/utility.service';
import {faCompress, faExpand, faTimes, faWindowMaximize, faWindowMinimize} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-window',
  template: `
    <div
      class="window"
      #window
      [class.full-screen]="currentWindow.properties.fullScreen"
      [class.on-focus]="currentWindow.properties.focus"
      [class.hidden]="currentWindow.properties.minified"
      [style.width]="currentWindow.properties?.size?.width || 'auto'"
      [style.height]="currentWindow.properties?.size?.height || 'auto'"
      (click)="!currentWindow.properties.focus && toggleWindowFocus()"
    >
      <div class="window-toolbar">
        <div class="window-toolbar-title">
          {{currentWindow?.properties?.title}}
        </div>
        <div class="window-toolbar-actions">
          <ng-container *ngIf="(utilityService.isMobile | async) === false">
            <div class="icon"
                 *ngIf="!currentWindow.properties.fullScreen"
                 (click)="toggleFullScreen()">
              <fa-icon [icon]="faMaximize"></fa-icon>
            </div>
            <div class="icon"
                 *ngIf="currentWindow.properties.fullScreen"
                 (click)="toggleFullScreen()"
            >
              <fa-icon [icon]="faMinimize"></fa-icon>
            </div>
          </ng-container>
          <div class="icon"
               (click)="toggleWindowMinified()"
          >
            <fa-icon [icon]="faWindowMinimize"></fa-icon>
          </div>
          <div class="icon"
               (click)="closeWindow()">
            <fa-icon [icon]="faClose"></fa-icon>
          </div>
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

  faMaximize = faExpand;
  faMinimize = faCompress;
  faWindowMaximize = faWindowMaximize;
  faWindowMinimize = faWindowMinimize;
  faClose = faTimes;

  @Input() currentWindow: Application;

  @ViewChild('window')
  _windowEl: ElementRef;

  @ViewChild('contentComponent', {read: ViewContainerRef, static: false})
  _windowContent: ViewContainerRef;

  private get windowEl(): HTMLElement {
    return this._windowEl.nativeElement;
  }


  constructor(
    public utilityService: UtilityService,
    private store$: Store<AppState>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

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
    if ( this.draggableRef ) {
      fullScreen ? this.draggableRef.disable() : this.draggableRef.enable();
      if ( fullScreen ) {
        this.windowEl.style.top = '50%';
        this.windowEl.style.left = '50%';
      }
    }
  }

  private animateIn() {
    if ( this.windowAnimation && this.windowAnimation.progress() === 1 ) {
      return;
    }
    window.requestAnimationFrame(() => {
      this.windowAnimation = new TimelineMax({paused: true, reversed: false});
      this.windowAnimation.to(this.windowEl, .25, {opacity: '1', ease: 'Expo.easeInOut'}, 0);
      this.windowAnimation.play();

      if ( this.currentWindow.properties.draggable ) {
        this.draggableRef = Draggable.create(this.windowEl,
          {
            type: 'x,y',
            edgeResistance: 0.65,
            trigger: this.windowEl.querySelector('.window-toolbar'),
            bounds: '.desktop',
            inertia: true,
            onClick: () => this.store$.dispatch(setAppFocus({app: this.currentWindow, focus: true})),
            onDragStart: () => this.store$.dispatch(setAppFocus({app: this.currentWindow, focus: true})),
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
    this.store$.dispatch(setAppFullscreen({
      app: this.currentWindow,
      fullScreen: !this.currentWindow.properties.fullScreen
    }));
  }

  toggleWindowFocus() {
    this.store$.dispatch(setAppFocus({app: this.currentWindow, focus: !this.currentWindow.properties.focus}));
  }

  toggleWindowMinified() {
    this.store$.dispatch(setAppMinified({app: this.currentWindow, minified: !this.currentWindow.properties.minified}));
  }
}

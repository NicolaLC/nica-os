import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadingMessage} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {environment} from 'src/environments/environment';
import {skip} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loader-component',
  template: `
    <div #loader class="loader">
      <div class="loader-title">
        <p>Nicola Castellani personal website [ Version {{environment.version}} ]</p>
        <p>PLEASE, WAIT UNTIL ALL ASSETS ARE LOADED.</p>
      </div>
      <ul>
        <li *ngFor="let message of (loadingMessage$ | async); let i = index; trackBy: trackByFn">
          <div class="loader-rindex">[{{ i }}]</div>
          <div class="loader-message" [innerHTML]="message | safe:'html'"></div>
        </li>
        <div class="loader-spinner" #spinner></div>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoaderComponent implements AfterViewInit, OnDestroy {
  loadingMessage$ = this.store$.pipe(select(selectLoadingMessage));
  environment = environment;

  loaderAnimation: TimelineMax;

  @ViewChild('loader')
  _loader: ElementRef;

  private get loader(): HTMLElement {
    return this._loader.nativeElement;
  }

  @ViewChild('spinner')
  _spinner: ElementRef;

  private get spinner(): HTMLElement {
    return this._spinner.nativeElement;
  }

  spinnerSteps = ['\\', '|', '/', '-', '\\', '|', '/', '-'];
  currentSpinnerStep = 0;

  subs: Subscription[] = [];

  constructor(public store$: Store<AppState>) {
    this.subs.push(
      this.loadingMessage$.pipe(
        skip(1)
      ).subscribe(next => {
        setTimeout(() => this.loader.scrollTop = this.loader.scrollHeight + 500, 100);
      }));
  }

  ngAfterViewInit() {
    this.animateLoader();
    this.animateSpinner();
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  private animateLoader() {
    window.requestAnimationFrame(() => {
      this.loaderAnimation = new TimelineMax({paused: true, reversed: false});
      this.loaderAnimation.to(this.loader, 1, {opacity: '1', ease: 'Expo.easeInOut'}, 0);
      this.loaderAnimation.play();
    });
  }

  animateSpinner() {
    window.requestAnimationFrame(() => {
      if (this.currentSpinnerStep >= this.spinnerSteps.length) {
        this.currentSpinnerStep = 0;
      }
      this.spinner.innerHTML = this.spinnerSteps[this.currentSpinnerStep++];
      setTimeout(() => {
        this.animateSpinner();
      }, 200);
    });
  }


  trackByFn(index, item) {
    return index;
  }
}

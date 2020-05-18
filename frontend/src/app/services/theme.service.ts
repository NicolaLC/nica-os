import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {AppState, selectAppSettings} from '../store/app.reducer';
import {select, Store} from '@ngrx/store';

@Injectable()
export class ThemeService implements OnDestroy {
  appSettings$ = this.store$.pipe(select(selectAppSettings));
  private subs: Subscription[] = [];

  constructor(private store$: Store<AppState>) {
    this.subs.push(
      this.appSettings$.pipe(
        first(),
        map(({theme}) => {
          this.setTheme(theme);
        })
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  setTheme(name: string) {
    const themeName = `${name}-theme`;
    const classList = document.body.classList;
    classList.forEach(className => { if (className === themeName) { return; } else { classList.remove(className); } });
    classList.add(themeName);
    (document.body.parentElement as any).classList = classList;
    window.localStorage.setItem('nos_th', name);
  }
}

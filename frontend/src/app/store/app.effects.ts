import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
  closeApp,
  createApp,
  loadAssets,
  loadAssetsSuccess,
  setConsoleMessage,
  setLoadingMessage, setAppFocus, setAppFullscreen, setAppMinified, setTheme
} from './app.actions';
import {AssetsService} from '../services/assets.service';
import {AppState, selectLoadedAssets} from './app.reducer';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {ThemeService} from '../services/theme.service';

@Injectable()
export class AppEffects {

  loadAssets$ = createEffect(() => this.actions$.pipe(
    ofType(loadAssets),
    withLatestFrom(
      this.store$.pipe(select(selectLoadedAssets))
    ),
    switchMap(([action, loadedAssets]) => {
      this.store$.dispatch(setLoadingMessage({message: 'Loading website assets.'}));
      if (loadedAssets) {
        this.store$.dispatch(setLoadingMessage({message: '<b>Loading</b> done.'}));
        return [loadAssetsSuccess({loadedAssets})];
      } else {
        return this.assetsService.getAll().pipe(
         switchMap(assets => {
           this.store$.dispatch(setLoadingMessage({message: '<b>Loading</b> done.'}));
           return of(loadAssetsSuccess({loadedAssets: assets}));
         })
        );
      }
    }))
  );

  createapp$ = createEffect(() => this.actions$.pipe(
    ofType(createApp),
    switchMap(({app}) => {
      this.store$.dispatch(setConsoleMessage({message: `<b>New app created</b>: ${app.properties.title}`}));
      return EMPTY;
    }))
  );

  closeApp$ = createEffect(() => this.actions$.pipe(
    ofType(closeApp),
    switchMap(({app}) => {
      this.store$.dispatch(setConsoleMessage({message: `<b>app closed</b>: ${app.properties.title}`}));
      return EMPTY;
    }))
  );

  setAppFullScreen$ = createEffect(() => this.actions$.pipe(
    ofType(setAppFullscreen),
    switchMap(({app}) => {
      this.store$.dispatch(setConsoleMessage({
        message: `<b>app</b> <i>${app.properties.title}</i> is now fullscreen <small>[${app.properties.fullScreen}]</small>`
      }));
      return EMPTY;
    }))
  );

  setAppFocus$ = createEffect(() => this.actions$.pipe(
    ofType(setAppFocus),
    switchMap(({app}) => {
      this.store$.dispatch(setConsoleMessage({
        message: `<b>app</b> <i>${app.properties.title}</i> is now on focus <small>[${app.properties.focus}]</small>`
      }));
      return EMPTY;
    }))
  );

  setAppMinified$ = createEffect(() => this.actions$.pipe(
    ofType(setAppMinified),
    switchMap(({app}) => {
      this.store$.dispatch(setConsoleMessage({
        message: `<b>app</b> <i>${app.properties.title}</i> is now on minified <small>[${app.properties.minified}]</small>`
      }));
      return EMPTY;
    }))
  );

  setTheme$ = createEffect(() => this.actions$.pipe(
    ofType(setTheme),
    switchMap(({theme}) => {
      this.themeService.setTheme(theme);
      return EMPTY;
    }))
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private assetsService: AssetsService,
    private themeService: ThemeService,
    private router: Router
  ) {}
}

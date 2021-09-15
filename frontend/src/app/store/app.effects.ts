import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
  closeApp,
  createApp,
  loadAssets,
  loadAssetsSuccess,
  openFile,
  setAppFocus,
  setAppFullscreen,
  setAppMinified,
  setConsoleMessage,
  setLoadingMessage,
  setTheme,
  toggleTaskbarThemeSelector
} from './app.actions';
import {AssetsService} from '@services/assets.service';
import {AppState, selectLoadedAssets} from './app.reducer';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {ThemeService} from '@services/theme.service';
import {UtilityService} from '@services/utility.service';
import {ConsoleMessage} from '@interfaces/interfaces';

@Injectable()
export class AppEffects {

  loadAssets$ = createEffect(() => this.actions$.pipe(
    ofType(loadAssets),
    withLatestFrom(
      this.store$.pipe(select(selectLoadedAssets))
    ),
    switchMap(([action, loadedAssets]) => {
      this.store$.dispatch(setLoadingMessage({message: 'Loading website assets.'}));
      if ( loadedAssets ) {
        this.store$.dispatch(setLoadingMessage({message: '<b>Loading</b> done.'}));
        return [loadAssetsSuccess({loadedAssets})];
      } else {
        return this.assetsService.getAll().pipe(
          switchMap(assets => {
            this.store$.dispatch(setLoadingMessage({message: '<b>Loading</b> done.'}));
            return of(assets);
          }),
          delay(2000),
          switchMap(assets => {
            return of(loadAssetsSuccess({loadedAssets: assets}));
          })
        );
      }
    }))
  );

  createApp$ = createEffect(() => this.actions$.pipe(
      ofType(createApp),
      map(({app}) => {
        this.store$.dispatch(setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>New app created</b>: ${ app.properties.title }`)
        }));
      })),
    {dispatch: false}
  );

  closeApp$ = createEffect(() => this.actions$.pipe(
      ofType(closeApp),
      map(({app}) => {
        this.store$.dispatch(setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>app closed</b>: ${ app.properties.title }`)
        }));
      })),
    {dispatch: false}
  );

  setAppFullScreen$ = createEffect(() => this.actions$.pipe(
      ofType(setAppFullscreen),
      map(({app}) => {
        this.store$.dispatch(setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>Application</b> <i>${ app.properties.title }</i> is now on fullscreen <small>[${ app.properties.fullScreen }]</small>`)
        }));
      })),
    {dispatch: false}
  );

  setAppFocus$ = createEffect(() => this.actions$.pipe(
      ofType(setAppFocus),
      map(({app}) => {
        this.store$.dispatch(setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>Application</b> <i>${ app.properties.title }</i> is now on focus <small>[${ app.properties.focus }]</small>`)
        }));
      })),
    {dispatch: false}
  );

  setAppMinified$ = createEffect(() => this.actions$.pipe(
      ofType(setAppMinified),
      map(({app}) => {
        this.store$.dispatch(setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>Application</b> <i>${ app.properties.title }</i> is now on minified <small>[${ app.properties.minified }]</small>`)
        }));
      })),
    {dispatch: false}
  );

  setTheme$ = createEffect(() => this.actions$.pipe(
    ofType(setTheme),
    switchMap(({theme}) => {
      this.themeService.setTheme(theme);
      return of(toggleTaskbarThemeSelector());
    }))
  );

  openFile$ = createEffect(() => this.actions$.pipe(
    ofType(openFile),
    switchMap(({file}) => {
      this.utility.openFile(file);
      return [
        setConsoleMessage({
          message: new ConsoleMessage('[OS]', `<b>Opening file:</b> <i>${ file.properties.name }</i>`)
        })
      ];
    }))
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private assetsService: AssetsService,
    private themeService: ThemeService,
    private utility: UtilityService
  ) {
  }
}

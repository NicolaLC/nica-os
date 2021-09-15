import {createReducer, createSelector, on} from '@ngrx/store';
import {
  closeApp,
  createApp,
  loadAssets,
  loadAssetsSuccess,
  setConsoleMessage,
  setLoadingMessage,
  setAppFocus,
  setAppFullscreen,
  setAppMinified,
  toggleMenuActive,
  closeMenu,
  setTheme,
  toggleTaskbarThemeSelector
} from './app.actions';
import {Application, AppSettings, AssetMap, ConsoleMessage} from '@interfaces/interfaces';
import {cloneDeep} from 'lodash';

export interface AppState {
  loading: boolean;
  loadingMessage: string[];
  consoleMessages: ConsoleMessage[];
  loadedAssets: AssetMap;
  applications: Application[];
  menuActive: boolean;
  taskbarThemeSelectorActive: boolean;
  appSettings: AppSettings;
}

export const initialState: AppState = {
  loading: true,
  loadingMessage: ['Welcome visitor, loading initial assets...'],
  consoleMessages: [],
  loadedAssets: null,
  applications: [],
  menuActive: false,
  taskbarThemeSelectorActive: false,
  appSettings: {theme: window.localStorage.getItem('nos_th') || 'default'}
};

const _appReducer = createReducer(initialState,
  on(loadAssets, (state) => ({...state, loading: true})),
  on(loadAssetsSuccess, (state, {loadedAssets}) => ({...state, loadedAssets, loading: false})),
  on(setLoadingMessage, (state, {message}) => ({...state, loadingMessage: [...state.loadingMessage, message]})),
  on(setConsoleMessage, (state, {message}) => ({...state, consoleMessages: [...state.consoleMessages, message]})),
  on(toggleMenuActive, (state) => ({...state, menuActive: !state.menuActive})),
  on(closeMenu, (state) => ({...state, menuActive: false})),
  on(createApp, (state, {app, data}) => {
    const applications = cloneDeep(state.applications);
    let newApp = cloneDeep(app);
    applications.map(a => {
      a.properties.focus = newApp ? a.id === newApp.id : false;
      /** if there is at least one focused app there is no new app */
      if ( a.properties.focus ) {
        a.properties.minified = false;
        newApp = null;
      }
    });
    if ( newApp ) {
      applications.push(newApp);
      if ( data ) { newApp.properties.data = data; }
    }
    return {...state, applications};
  }),
  on(closeApp, (state, {app}) => {
    let applications = cloneDeep(state.applications);
    applications = applications.filter(w => w.id !== app.id);
    return {...state, applications};
  }),
  on(setAppFullscreen, (state, {app, fullScreen}) => {
    const applications = cloneDeep(state.applications);
    applications.map(w => w.id === app.id ? w.properties.fullScreen = fullScreen : w);
    return {...state, applications};
  }),
  on(setAppFocus, (state, {app, focus}) => {
    const applications = cloneDeep(state.applications);
    applications.map(w => w.id === app.id ? w.properties.focus = focus : w.properties.focus = false);
    return {...state, applications, menuActive: false};
  }),
  on(setAppMinified, (state, {app, minified}) => {
    const applications = cloneDeep(state.applications);
    applications.map(w => w.id === app.id ? w.properties.minified = minified : w);
    return {...state, applications};
  }),
  on(setTheme, (state, {theme}) => ({...state, appSettings: {...state.appSettings, theme}})),
  on(toggleTaskbarThemeSelector, (state) => ({
    ...state,
    taskbarThemeSelectorActive: !state.taskbarThemeSelectorActive
  })),
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}

export const selectAppState = (state) => state.app;
export const selectLoadedAssets = createSelector(
  selectAppState,
  (state: AppState) => state.loadedAssets
);
export const selectLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);
export const selectLoadingMessage = createSelector(
  selectAppState,
  (state: AppState) => state.loadingMessage
);
export const selectConsoleMessages = createSelector(
  selectAppState,
  (state: AppState) => state.consoleMessages
);
export const selectActiveApplications = createSelector(
  selectAppState,
  (state: AppState) => state.applications
);
export const selectMenuActive = createSelector(
  selectAppState,
  (state: AppState) => state.menuActive
);
export const selectAppSettings = createSelector(
  selectAppState,
  (state: AppState) => state.appSettings
);
export const selectTheme = createSelector(
  selectAppSettings,
  (state: AppSettings) => state.theme
);
export const selectTaskbarThemeSelectorActive = createSelector(
  selectAppState,
  (state: AppState) => state.taskbarThemeSelectorActive
);


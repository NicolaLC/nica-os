import {createReducer, createSelector, on} from '@ngrx/store';
import {
  closeApp,
  createApp,
  loadAssets,
  loadAssetsSuccess, setConsoleMessage,
  setLoadingMessage, setAppFocus, setAppFullscreen, setAppMinified, toggleMenuActive
} from './app.actions';
import {Application, AssetMap} from '../interfaces';
import {cloneDeep} from 'lodash';

export interface AppState {
  loading: boolean;
  loadingMessage: string[];
  consoleMessages: string[];
  loadedAssets: AssetMap;
  applications: Application[];
  menuActive: boolean;
}

export const initialState: AppState = {
  loading: true,
  loadingMessage: ['Welcome visitor, loading initial assets...'],
  consoleMessages: [],
  loadedAssets: null,
  applications: [],
  menuActive: false
};

const _appReducer = createReducer(initialState,
  on(loadAssets, (state) => ({...state, loading: true})),
  on(loadAssetsSuccess, (state, {loadedAssets}) => ({...state, loadedAssets, loading: false})),
  on(setLoadingMessage, (state, {message}) => ({...state, loadingMessage: [...state.loadingMessage, message]})),
  on(setConsoleMessage, (state, {message}) => ({...state, consoleMessages: [...state.consoleMessages, message]})),
  on(toggleMenuActive, (state) => ({...state, menuActive: !state.menuActive})),
  on(createApp, (state, {app}) => {
    const applications = cloneDeep(state.applications);
    let newApp = app;
    applications.map(a => {
      a.properties.focus = newApp && a.id === newApp.id;
      /** if there is at least one focused app there is no new app */
      if (a.properties.focus) { newApp = null; }
    });
    if (newApp) {
      applications.push(newApp);
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
    return {...state, applications};
  }),
  on(setAppMinified, (state, {app, minified}) => {
    const applications = cloneDeep(state.applications);
    applications.map(w => w.id === app.id ? w.properties.minified = minified : w);
    return {...state, applications};
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}

export const selectAppState = (state: any) => state.app;
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
export const selectApplications = createSelector(
  selectAppState,
  (state: AppState) => state.applications
);
export const selectMenuActive = createSelector(
  selectAppState,
  (state: AppState) => state.menuActive
);


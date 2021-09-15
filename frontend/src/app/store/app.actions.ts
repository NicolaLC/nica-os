import {createAction, props} from '@ngrx/store';
import {Application, ConsoleMessage, File} from '../interfaces/interfaces';

/** ASSETS MANAGEMENT */
export const loadAssets = createAction('[App] Load Assets');
export const loadAssetsSuccess = createAction('[App] Load Assets Success', props<{ loadedAssets: { [key: string]: any } }>());
export const loadAssetsFail = createAction('[App] Load Assets Fail');

/** MESSAGE MANAGEMENT */
export const setLoadingMessage = createAction('[App] Set Loading Message', props<{ message: string }>());
export const setConsoleMessage = createAction('[App] Set Console Message', props<{ message: ConsoleMessage }>());

/** WINDOW MANAGEMENT */
export const createApp = createAction(
  '[App] Create window',
  props<{ app: Application, data?: any }>()
);
export const closeApp = createAction('[App] Close window', props<{ app: Application }>());
export const setAppFullscreen = createAction('[App] Toggle window fullscreen', props<{ app: Application, fullScreen: boolean }>());
export const setAppFocus = createAction('[App] Toggle window focus', props<{ app: Application, focus: boolean }>());
export const setAppMinified = createAction('[App] Toggle window minified', props<{ app: Application, minified: boolean }>());

/** FILE MANAGEMENT */
export const openFile = createAction('[App] Open file', props<{ file: File }>());

/** MENU MANAGEMENT */
export const toggleMenuActive = createAction('[App] Toggle menu active');
export const closeMenu = createAction('[App] Close menu');

/** APP SETTINGS MANAGEMENT */
export const setTheme = createAction('[App] Set Theme', props<{ theme: string }>());
export const toggleTaskbarThemeSelector = createAction('[App] Toggle Taskbar Theme selector');

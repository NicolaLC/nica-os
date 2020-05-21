import {createAction, props} from '@ngrx/store';
import {Application} from '@interfaces/interfaces';



/** FS MANAGEMENT */
export const loadApplications = createAction('[FileExplorer] Load applications', props<{applications: Application[]}>());
export const loadItems = createAction('[FileExplorer] Load items', props<{path: string}>());
export const setCurrentPath = createAction('[FileExplorer] Set current path', props<{path: string}>());

export const resetFileExplorer = createAction('[FileExplorer] Reset state');

import {createReducer, createSelector, on} from '@ngrx/store';
import {fs} from '@constants/filesystem';
import {Application, APPLICATION_CATEGORY, File} from '@interfaces/interfaces';
import {loadApplications, loadFiles, loadItems, resetFileExplorer, setCurrentPath} from './file-explorer.actions';

export interface FileExplorerState {
  currentPath?: string;
  currentPathItems?: File[] & Application[];
  applications?: Application[];
  files?: File[];
}

export const initialState: FileExplorerState = {
  currentPath: fs.root, currentPathItems: [], applications: [], files: []
};

const _fileExplorerReducer = createReducer(initialState,
  on(loadApplications, (state, {applications}) => ({
    ...state, applications
  })),
  on(loadFiles, (state, {files}) => ({...state, files})),
  on(loadItems, (state, {path}) => {
    const currentPathItems = [];
    return {...state, currentPath: fs.getPath(path), currentPathItems};
  }),
  on(setCurrentPath, (state, {path}) => ({
    ...state, currentPath: fs.getPath(path)
  })),
  on(resetFileExplorer, (state) => ({
    ...state, currentPath: initialState.currentPath, currentPathItems: initialState.currentPathItems
  })));

export function fileExplorerReducer(state, action) {
  return _fileExplorerReducer(state, action);
}

export const selectFileExplorerState = (state) => state.fs;
export const selectCurrentPath = createSelector(selectFileExplorerState, (state: FileExplorerState) => state.currentPath);
export const selectApplications = createSelector(selectFileExplorerState, (state: FileExplorerState, props?: { path: string }) => props && props.path ? state.applications.filter(app => app.properties.fs.paths.indexOf(props.path) > -1) : state.applications);
export const selectFiles = createSelector(selectFileExplorerState, (state: FileExplorerState, props?: { path: string }) => props && props.path ? state.files.filter(file => file.fs.paths.indexOf(props.path) > -1) : state.files);
export const selectApplicationsByCategory = createSelector(selectFileExplorerState, (state: FileExplorerState, props?: { category: APPLICATION_CATEGORY }) => props && props.category ? state.applications.filter(app => app.properties.fs.category === props.category) : []);
export const selectApplicationsByCurrentPath = createSelector(selectFileExplorerState, (state: FileExplorerState) => state.applications.filter(app => app.properties.fs.paths.indexOf(state.currentPath) > -1));
export const selectFilesByCurrentPath = createSelector(selectFileExplorerState, (state: FileExplorerState) => state.files.filter(file => file.fs.paths.indexOf(state.currentPath) > -1));

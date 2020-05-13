import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState, selectLoadedAssets} from './store/app.reducer';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {loadAssets} from './store/app.actions';

@Injectable({ providedIn: 'root' })
export class AssetsResolver implements Resolve<any> {
  loadedAssets$ = this.store.pipe(select(selectLoadedAssets));
  constructor(
    public store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    this.store.dispatch(loadAssets());
    return this.loadedAssets$.pipe(take(1));
  }
}

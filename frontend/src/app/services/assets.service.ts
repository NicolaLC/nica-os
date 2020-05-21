import {Injectable} from '@angular/core';
import {forkJoin, of} from 'rxjs';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {assetsToLoad} from '../constants/assets';
import {AppState} from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {setLoadingMessage} from '../store/app.actions';

@Injectable()
export class AssetsService {
  assetsToLoad = assetsToLoad;

  constructor(
    private http: HttpClient,
    private store$: Store<AppState>
  ) {
  }

  getAll() {
    const keys = Object.keys(this.assetsToLoad);
    const calls = [];
    keys.map(async (assetKey) => {
      calls.push(
        this.loadAsset(assetKey)
      );
    });
    return forkJoin(calls).pipe(
      map(results => {
        keys.map((key, index) => this.assetsToLoad[key] = {
          ...this.assetsToLoad[key],
          loaded: true,
          resource: results[index]
        });
        return this.assetsToLoad;
      })
    );
  }

  private loadAsset(assetKey: string) {
    return this.http.get(`assets/${this.assetsToLoad[assetKey].path}`, {responseType: 'text'})
      .pipe(
        switchMap(res => {
          this.store$.dispatch(setLoadingMessage({message: `<i><pre>[200]</pre> LOADED </i>: ${assetKey}`}));
          return of(res);
        }),
        catchError(err => {
          this.store$.dispatch(setLoadingMessage(
            {message: `<small>ERROR</small>: ${assetKey} - <small>${err.status} - ${err.statusText}</small>`}));
          return of(null);
        })
      );
  }
}

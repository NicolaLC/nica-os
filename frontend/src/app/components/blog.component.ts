import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadedAssets} from '../store/app.reducer';

@Component({
  selector: 'app-blog-component',
  template: `
    <div class="blog">
      <div class="box">
        <div class="box-intro">
          - My latest articles
        </div>
        <div class="box-title">
          Sometimes I take some time to write something down.
        </div>
        <div class="box-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore
          magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </div>
        <div class="box-link">
          <a href="https://dev.to/nicolalc" target="_blank">
            visit my dev.to profile
            <div class="icon" [innerHTML]="(loadedAssets | async)?.arrowRight?.resource | safe:'html' "></div>
          </a>
        </div>
      </div>
      <div class="blog-list">
        <div class="blog-list-item">
          <div class="blog-list-item-date">
            4th May 2020
          </div>
          <div class="blog-list-item-title">
            <h3>A cool way to handle scss color variables</h3>
          </div>
          <div class="blog-list-item-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore
              magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo
              consequat.Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla
              pariatur [...]
            </p>
          </div>
          <div class="blog-list-item-link">
            <a href="https://dev.to/nicolalc" target="_blank">
              READ MORE
              <div class="icon" [innerHTML]="(loadedAssets | async)?.arrowRight?.resource | safe:'html' "></div>
            </a>
          </div>
        </div>
        <div class="blog-list-item">
          <div class="blog-list-item-date">
            4th May 2020
          </div>
          <div class="blog-list-item-title">
            <h3>A cool way to handle scss color variables</h3>
          </div>
          <div class="blog-list-item-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore
              magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo
              consequat.Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla
              pariatur [...]
            </p>
          </div>
          <div class="blog-list-item-link">
            <a href="https://dev.to/nicolalc" target="_blank">
              READ MORE
              <div class="icon" [innerHTML]="(loadedAssets | async)?.arrowRight?.resource | safe:'html' "></div>
            </a>
          </div>
        </div>
        <div class="blog-list-item">
          <div class="blog-list-item-date">
            4th May 2020
          </div>
          <div class="blog-list-item-title">
            <h3>A cool way to handle scss color variables</h3>
          </div>
          <div class="blog-list-item-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore
              magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo
              consequat.Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla
              pariatur [...]
            </p>
          </div>
          <div class="blog-list-item-link">
            <a href="https://dev.to/nicolalc" target="_blank">
              READ MORE
              <div class="icon" [innerHTML]="(loadedAssets | async)?.arrowRight?.resource | safe:'html' "></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogComponent {
  loadedAssets = this.store$.pipe(select(selectLoadedAssets));

  constructor(public store$: Store<AppState>) {
  }
}

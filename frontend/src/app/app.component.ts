import { Component } from '@angular/core';
import Draggable from 'gsap/Draggable';
import { gsap } from 'gsap';
import { Store } from '@ngrx/store';
import { APPLICATIONS } from '@constants/applications';
import { loadApplications, loadFiles } from '@fsstore/file-explorer.actions';
import {FILES} from '@constants/filesystem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nicola Castellani';

  constructor(private store$: Store<any>) {
    gsap.registerPlugin(Draggable);
    this.loadApplications();
    this.loadFiles();
  }

  /** @desc load all website applications */
  loadApplications() {
    this.store$.dispatch(loadApplications({applications: Object.values(APPLICATIONS)}));
  }
  /** @desc load all website files */
  loadFiles() {
    this.store$.dispatch(loadFiles({files: Object.values(FILES)}));
  }
}

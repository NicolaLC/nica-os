import { Component } from '@angular/core';
import Draggable from 'gsap/Draggable';
import { gsap } from 'gsap';
import { Store } from '@ngrx/store';
import { APPLICATIONS } from '@constants/applications';
import { loadApplications } from '@fsstore/file-explorer.actions';

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
  }

  loadApplications() {
    this.store$.dispatch(loadApplications({applications: Object.values(APPLICATIONS)}));
  }
}

import { Component } from '@angular/core';
import Draggable from 'gsap/Draggable';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nicola Castellani';

  constructor() {
    gsap.registerPlugin(Draggable);
  }
}

import {Component, Input} from '@angular/core';
import {faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';

@Component({
  selector: 'app-tooltip',
  template: `
    <div
      class="tooltip"
    >
      <fa-icon [icon]="faInfo"></fa-icon>
      <ng-content></ng-content>
      <div *ngIf="html"
           [innerHTML]="html | safe:'html'"></div>
    </div>
  `
})

export class TooltipComponent {
  @Input() html;
  faInfo = faInfoCircle;
}

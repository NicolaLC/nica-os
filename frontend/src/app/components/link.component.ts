import {Component, Input} from '@angular/core';
import {faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-link',
  template: `
    <a (click)="navigate()"
       class="app-link">
      <fa-icon [icon]="icon ?? faExternal"></fa-icon>
      <b><i>
        <ng-content></ng-content>
      </i></b>
    </a>
  `
})

export class LinkComponent {
  @Input() link: string;
  @Input() icon: IconDefinition;
  @Input() target = '_blank';

  faExternal = faExternalLinkSquareAlt;

  navigate() {
    if ( !this.link ) {
      console.warn('Trying to open an empty link');
      return;
    }
    window.open(this.link, this.target);
  }
}
